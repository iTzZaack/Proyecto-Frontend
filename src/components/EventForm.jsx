import { useState } from 'react';

const REQUERIMIENTOS_LIST = [
  'Equipo de Sonido',
  'Artistas / DJ',
  'Presentador / Animador',
  'Comediante',
  'Luces y Escenario',
  'Fotografía / Video'
];

const DECORACION_LIST = [
  'Sin Decoración',
  'Moderna / Minimalista',
  'Clásica / Elegante',
  'Temática / Rústica',
  'Infantil / Festiva'
];

const COMIDAS_LIST = ['Buffet / Banquete', 'Bocaditos / Coctel', 'Plato Fuerte', 'Postres y Bebidas', 'Vegetariana / Vegana'];
const PERSONAL_CATERING_LIST = ['Meseros', 'Chefs', 'Bartenders', 'Coordinador de Limpieza'];

// Clase reutilizable para todos los inputs/select/textarea del formulario
const estiloCampo =
  'w-full rounded-md border border-line bg-panel-raised p-2 text-paper placeholder-mute ' +
  'focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber';

// EventForm recibe "key={editingEvent?.id ?? 'new'}" desde App.jsx.
// Gracias a eso, React DESTRUYE y vuelve a MONTAR este componente cada
// vez que se pasa de "crear" a "editar" (o viceversa), así los useState
// de abajo pueden calcular su valor inicial directamente a partir de
// "editingEvent" (con una función perezosa) sin necesitar un useEffect.
export default function EventForm({ onAddEvent, onUpdateEvent, editingEvent, setEditingEvent }) {
  const [title, setTitle] = useState(() => editingEvent?.title || '');
  const [category, setCategory] = useState(() => editingEvent?.category || 'Conferencia');
  const [date, setDate] = useState(() => editingEvent?.date || '');
  const [location, setLocation] = useState(() => editingEvent?.location || '');
  const [capacity, setCapacity] = useState(() => editingEvent?.capacity || '');
  const [organizer, setOrganizer] = useState(() => editingEvent?.organizer || '');

  const [indicaciones, setIndicaciones] = useState(() => editingEvent?.indicaciones || []);
  const [decoracion, setDecoracion] = useState(() => editingEvent?.decoracion || 'Sin Decoración');
  const [comidas, setComidas] = useState(() => editingEvent?.comidas || []);
  const [personalCatering, setPersonalCatering] = useState(() => editingEvent?.personalCatering || []);
  const [notasCatering, setNotasCatering] = useState(() => editingEvent?.notasCatering || '');
  const [peticionesAdicionales, setPeticionesAdicionales] = useState(
    () => editingEvent?.peticionesAdicionales || ''
  );

  function resetForm() {
    setTitle('');
    setCategory('Conferencia');
    setDate('');
    setLocation('');
    setCapacity('');
    setOrganizer('');
    setIndicaciones([]);
    setDecoracion('Sin Decoración');
    setComidas([]);
    setPersonalCatering([]);
    setNotasCatering('');
    setPeticionesAdicionales('');
  }

  const handleCheckboxChange = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date || !location.trim() || !capacity) {
      return alert('⚠️ Por favor completa los campos principales (Título, Fecha, Lugar y Cupo).');
    }

    const payload = {
      title,
      category,
      date,
      location,
      capacity: parseInt(capacity, 10),
      organizer,
      indicaciones,
      decoracion,
      comidas,
      personalCatering,
      notasCatering,
      peticionesAdicionales
    };

    if (editingEvent) {
      onUpdateEvent({ ...editingEvent, ...payload });
      setEditingEvent(null);
    } else {
      onAddEvent({ ...payload, attendees: 0 });
    }
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-8 rounded-lg border bg-panel p-6 transition-colors duration-300 ${
        editingEvent ? 'border-amber' : 'border-line'
      }`}
    >
      <h2 className="mb-4 font-display text-xl font-bold text-paper">
        {editingEvent ? '✏️ Editar Evento' : '➕ Registrar Nuevo Evento'}
      </h2>

      {/* Datos Generales */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-mute">Nombre del evento *</label>
          <input
            type="text"
            placeholder="Ej. Conferencia de Software"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={estiloCampo}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Organizador</label>
          <input
            type="text"
            placeholder="Ej. Isaac"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className={estiloCampo}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={estiloCampo}>
            <option value="Conferencia">Conferencia</option>
            <option value="Taller">Taller</option>
            <option value="Deportes">Deportes</option>
            <option value="Social">Social</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Fecha y Hora *</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={estiloCampo}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Ubicación / Lugar *</label>
          <input
            type="text"
            placeholder="Ej. Auditorio CENESTUR"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={estiloCampo}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-mute">Cupo Máximo *</label>
          <input
            type="number"
            placeholder="Ej. 60"
            value={capacity}
            min="1"
            onChange={(e) => setCapacity(e.target.value)}
            className={estiloCampo}
          />
        </div>
      </div>

      {/* Indicaciones / Equipamiento */}
      <div className="mb-4">
        <label className="mb-2 block text-xs text-mute">Indicaciones y Requerimientos Específicos</label>
        <div className="grid grid-cols-2 gap-2 rounded border border-line bg-panel-raised p-3 md:grid-cols-3">
          {REQUERIMIENTOS_LIST.map((item) => (
            <label key={item} className="flex cursor-pointer items-center space-x-2 text-sm text-paper">
              <input
                type="checkbox"
                checked={indicaciones.includes(item)}
                onChange={() => handleCheckboxChange(item, indicaciones, setIndicaciones)}
                className="rounded"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tipo de Decoración */}
      <div className="mb-4">
        <label className="mb-2 block text-xs text-mute">Tipo de Decoración</label>
        <div className="flex flex-wrap gap-4 rounded border border-line bg-panel-raised p-3">
          {DECORACION_LIST.map((tipo) => (
            <label key={tipo} className="flex cursor-pointer items-center space-x-2 text-sm text-paper">
              <input
                type="radio"
                name="decoracion"
                value={tipo}
                checked={decoracion === tipo}
                onChange={(e) => setDecoracion(e.target.value)}
              />
              <span>{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sección Catering */}
      <div className="mb-4 rounded-lg border border-line bg-panel-raised p-4">
        <h3 className="mb-3 font-display text-md font-semibold text-amber">🍽️ Sección de Catering</h3>

        <div className="mb-3">
          <label className="mb-1 block text-xs text-mute">Tipo de Comida (Selección Múltiple)</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {COMIDAS_LIST.map((food) => (
              <label key={food} className="flex cursor-pointer items-center space-x-2 text-sm text-paper">
                <input
                  type="checkbox"
                  checked={comidas.includes(food)}
                  onChange={() => handleCheckboxChange(food, comidas, setComidas)}
                  className="rounded"
                />
                <span>{food}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs text-mute">Personal de Catering Requerido</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {PERSONAL_CATERING_LIST.map((staff) => (
              <label key={staff} className="flex cursor-pointer items-center space-x-2 text-sm text-paper">
                <input
                  type="checkbox"
                  checked={personalCatering.includes(staff)}
                  onChange={() => handleCheckboxChange(staff, personalCatering, setPersonalCatering)}
                  className="rounded"
                />
                <span>{staff}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-mute">Observaciones de Catering</label>
          <textarea
            rows="2"
            placeholder="Ej. Alergias, horarios de servicio..."
            value={notasCatering}
            onChange={(e) => setNotasCatering(e.target.value)}
            className={`${estiloCampo} text-sm resize-none`}
          ></textarea>
        </div>
      </div>

      {/* Observaciones y Peticiones Adicionales */}
      <div className="mb-6">
        <label className="mb-1 block text-xs text-mute">📝 Observaciones y Peticiones Adicionales del Evento</label>
        <textarea
          rows="3"
          placeholder="Escribe aquí cualquier solicitud especial, notas de organización o requerimiento adicional..."
          value={peticionesAdicionales}
          onChange={(e) => setPeticionesAdicionales(e.target.value)}
          className={`${estiloCampo} text-sm resize-none`}
        ></textarea>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="btn-shine flex-1 rounded-md bg-amber py-2 font-semibold text-ink transition-colors hover:bg-amber-light"
        >
          {editingEvent ? 'Guardar Cambios' : 'Guardar Evento'}
        </button>
        {editingEvent && (
          <button
            type="button"
            onClick={() => setEditingEvent(null)}
            className="rounded-md border border-line px-4 py-2 text-mute hover:text-paper"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}