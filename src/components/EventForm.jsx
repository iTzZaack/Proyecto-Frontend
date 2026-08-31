import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIAS } from '../utils/events';

// Valores por defecto de un formulario "vacío" (para crear un evento nuevo)
const CAMPOS_INICIALES = {
  title: '',
  category: CATEGORIAS[0],
  date: '',
  location: '',
  capacity: '',
};

// Clase reutilizable de estilo para todos los inputs del formulario
const estiloCampo =
  'w-full rounded-md border border-line bg-panel-raised p-2 text-paper placeholder-mute ' +
  'focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber';

function EventForm({ onAddEvent, onUpdateEvent, editingEvent, setEditingEvent }) {
  // Si "editingEvent" viene con datos, el formulario arranca ya lleno
  // con esos valores (modo edición). Si no, arranca vacío (modo creación).
  // Nota: gracias a la prop "key" en App.jsx, este componente se vuelve
  // a montar cada vez que se cambia entre crear/editar, por eso basta
  // con calcular el estado inicial una sola vez aquí.
  const [campos, setCampos] = useState(() =>
    editingEvent
      ? {
          title: editingEvent.title,
          category: editingEvent.category,
          date: editingEvent.date,
          location: editingEvent.location,
          capacity: editingEvent.capacity,
        }
      : CAMPOS_INICIALES
  );

  // Handler genérico: usa el atributo "name" de cada input para saber
  // qué campo del objeto "campos" actualizar (evita escribir un
  // handler distinto por cada input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos({ ...campos, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que la página se recargue al enviar el form

    const { title, date, location, capacity } = campos;
    // Validación simple: todos los campos son obligatorios
    if (!title.trim() || !date || !location.trim() || !capacity) {
      alert('Completa todos los campos antes de guardar el evento.');
      return;
    }

    if (editingEvent) {
      // Modo edición: se actualiza el evento existente
      onUpdateEvent({ ...editingEvent, ...campos, capacity: parseInt(capacity, 10) });
      setEditingEvent(null);
    } else {
      // Modo creación: se agrega un evento nuevo, empezando con 0 asistentes
      onAddEvent({ ...campos, capacity: parseInt(capacity, 10), attendees: 0 });
    }
    setCampos(CAMPOS_INICIALES); // limpia el formulario
  };

  return (
    <form
      onSubmit={handleSubmit}
      // El borde cambia de color (a ámbar) cuando el formulario está en modo edición,
      // como pista visual de que se está modificando un evento existente
      className={`mb-8 rounded-lg border bg-panel p-6 transition-colors duration-300 ${
        editingEvent ? 'border-amber' : 'border-line'
      }`}
    >
      <h2 className="mb-4 font-display text-lg font-bold text-paper">
        {editingEvent ? 'Editar evento' : 'Registrar nuevo evento'}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-mute">Nombre del evento</label>
          <input
            type="text"
            name="title"
            placeholder="Ej. Conferencia de React"
            value={campos.title}
            onChange={handleChange}
            className={estiloCampo}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Categoría</label>
          <select name="category" value={campos.category} onChange={handleChange} className={estiloCampo}>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Fecha</label>
          <input type="date" name="date" value={campos.date} onChange={handleChange} className={estiloCampo} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Ubicación</label>
          <input
            type="text"
            name="location"
            placeholder="Ej. Auditorio principal"
            value={campos.location}
            onChange={handleChange}
            className={estiloCampo}
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-mute">Cupo máximo</label>
          <input
            type="number"
            name="capacity"
            placeholder="Número máximo de participantes"
            min="1"
            value={campos.capacity}
            onChange={handleChange}
            className={estiloCampo}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="flex-1 rounded-md bg-amber py-2 font-semibold text-ink transition-colors hover:bg-amber-light"
        >
          {editingEvent ? 'Guardar cambios' : 'Guardar evento'}
        </motion.button>
        {/* El botón "Cancelar" solo existe en modo edición, y aparece/desaparece
            con una animación de ancho (se "despliega" en vez de aparecer de golpe) */}
        <AnimatePresence initial={false}>
          {editingEvent && (
            <motion.button
              key="cancelar"
              type="button"
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 0 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setEditingEvent(null)}
              className="overflow-hidden whitespace-nowrap rounded-md border border-line px-4 py-2 text-mute hover:text-paper"
            >
              Cancelar
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default EventForm;
