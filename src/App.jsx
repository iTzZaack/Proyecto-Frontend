// Hooks de React: useState para guardar datos que cambian (estado),
// useEffect para ejecutar código cuando ese estado cambia (efectos secundarios)
import { useState, useEffect } from 'react';
// framer-motion: librería para animaciones (entradas suaves de los elementos)
import { motion } from 'framer-motion';

// Componentes propios de la app, cada uno en su propio archivo
import Navbar from './components/Navbar';
import EventForm from './components/EventForm';
import SearchAndFilter from './components/SearchAndFilter';
import EventStats from './components/EventStats';
import EventList from './components/EventList';
import ConfirmDialog from './components/ConfirmDialog';
import Footer from './components/Footer';

// "Variantes" de animación para framer-motion.
// contenedor: hace que sus hijos aparezcan uno tras otro (staggerChildren)
// en vez de todos a la vez, dando un efecto en cascada.
const contenedor = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// seccion: define cómo aparece cada bloque individual
// (empieza invisible y 14px más abajo, y sube mientras aparece)
const seccion = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Componente principal de la aplicación. Todo lo demás se renderiza dentro de él.
export default function App() {
  // Estado principal: la lista de eventos.
  // El valor inicial se calcula UNA sola vez leyendo localStorage
  // (así, si recargas la página, no se pierden los eventos guardados).
  const [eventos, setEventos] = useState(() => {
    const guardado = localStorage.getItem('cenestur_events');
    return guardado ? JSON.parse(guardado) : [];
  });

  // Texto que el usuario escribe en el buscador
  const [busqueda, setBusqueda] = useState('');
  // Categoría seleccionada en el filtro (por defecto "Todas")
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  // Guarda el evento que se está editando actualmente (null si no hay ninguno)
  const [eventoEditando, setEventoEditando] = useState(null);
  // Guarda el id del evento que el usuario quiere eliminar,
  // para mostrar el diálogo de confirmación antes de borrarlo de verdad
  const [idAEliminar, setIdAEliminar] = useState(null);

  // Cada vez que "eventos" cambia, se vuelve a guardar en localStorage.
  // Esto es lo que hace que los datos persistan entre recargas de página.
  useEffect(() => {
    localStorage.setItem('cenestur_events', JSON.stringify(eventos));
  }, [eventos]);

  // Agrega un evento nuevo a la lista, generando un id único con Date.now()
  const agregarEvento = (nuevoEvento) => {
    setEventos([...eventos, { ...nuevoEvento, id: Date.now() }]);
  };

  // Reemplaza el evento con el mismo id por la versión actualizada
  const actualizarEvento = (eventoActualizado) => {
    setEventos(eventos.map((e) => (e.id === eventoActualizado.id ? eventoActualizado : e)));
  };

  // Se ejecuta cuando el usuario confirma en el ConfirmDialog:
  // borra de la lista el evento cuyo id coincide con idAEliminar
  const confirmarEliminar = () => {
    setEventos(eventos.filter((evento) => evento.id !== idAEliminar));
    setIdAEliminar(null); // cierra el diálogo
  };

  // Suma un asistente al evento, solo si todavía hay cupo disponible
  // (attendees = asistentes actuales, capacity = capacidad máxima)
  const registrarAsistente = (id) => {
    setEventos(
      eventos.map((evento) => {
        if (evento.id === id && evento.attendees < evento.capacity) {
          return { ...evento, attendees: evento.attendees + 1 };
        }
        return evento; // los demás eventos quedan igual
      })
    );
  };

  // Ressta un asistente al evento
  // (attendees = asistentes actuales, evento.attendees = asistentes actuales del evento)
   const quitarAsistente = (id) => {
    setEventos(
      eventos.map((evento) => {
        if (evento.id === id && evento.attendees > 0) {
          return { ...evento, attendees: evento.attendees - 1 };
        }
        return evento;
      })
    );
  };

  // Filtra la lista de eventos combinando dos condiciones:
  // 1) que el texto de búsqueda aparezca en el título o la ubicación
  // 2) que coincida con la categoría elegida (o que el filtro sea "Todas")
  // Esto se recalcula en cada render, así que la lista mostrada
  // siempre refleja los filtros actuales sin necesidad de un botón "Buscar".
  const eventosFiltrados = eventos.filter((evento) => {
    const coincideBusqueda =
      evento.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      evento.location.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === 'Todas' || evento.category === categoriaFiltro;
    return coincideBusqueda && coincideCategoria;
  });

  // JSX: lo que realmente se dibuja en pantalla.
  return (
    <div className="flex min-h-screen flex-col justify-between bg-ink text-paper">
      <div>
        {/* Barra de navegación superior */}
        <Navbar />

        {/* motion.main envuelve todo el contenido con la animación "contenedor",
            haciendo que sus hijos (los motion.div de abajo) aparezcan en cascada */}
        <motion.main
          variants={contenedor}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl px-4 pt-8 pb-12"
        >
          {/* Tarjetas con estadísticas (total de eventos, asistentes, etc.) */}
          <motion.div variants={seccion}>
            <EventStats events={eventos} />
          </motion.div>

          {/* Formulario para crear o editar un evento.
              La prop "key" cambia entre 'new' y el id del evento editado:
              esto fuerza a React a re-montar el formulario y limpiar sus campos
              cada vez que se pasa de "crear" a "editar" (o viceversa). */}
          <motion.div variants={seccion}>
            <EventForm
              key={eventoEditando?.id ?? 'new'}
              onAddEvent={agregarEvento}
              onUpdateEvent={actualizarEvento}
              editingEvent={eventoEditando}
              setEditingEvent={setEventoEditando}
            />
          </motion.div>

          {/* Barra de búsqueda + filtro por categoría */}
          <motion.div variants={seccion}>
            <SearchAndFilter
              search={busqueda}
              setSearch={setBusqueda}
              filterCategory={categoriaFiltro}
              setFilterCategory={setCategoriaFiltro}
            />
          </motion.div>

          {/* Lista de eventos ya filtrados.
              Recibe funciones para registrar asistentes, pedir eliminación
              (abre el diálogo de confirmación) y editar un evento */}
          <motion.div variants={seccion}>
            <EventList
              events={eventosFiltrados}
              onRegister={registrarAsistente}
              onUnregister={quitarAsistente}
              onDelete={setIdAEliminar}
              onEdit={setEventoEditando}
            />
          </motion.div>
        </motion.main>
      </div>

      {/* Pie de página, siempre al fondo gracias a justify-between en el div padre */}
      <Footer />

      {/* Diálogo de confirmación para eliminar un evento.
          "open" controla si se muestra: es true cuando idAEliminar tiene un valor
          (es decir, cuando el usuario le dio click a "eliminar" en algún evento) */}
      <ConfirmDialog
        open={idAEliminar !== null}
        title="Eliminar evento"
        message="Esta acción no se puede deshacer. ¿Seguro que quieres eliminarlo?"
        onConfirm={confirmarEliminar}
        onCancel={() => setIdAEliminar(null)}
      />
    </div>
  );
}
