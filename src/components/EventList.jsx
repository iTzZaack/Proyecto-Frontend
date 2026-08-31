// AnimatePresence permite animar la SALIDA de elementos (ej: cuando se
// elimina una fila de la tabla, no desaparece de golpe, se desvanece)
import { AnimatePresence, motion } from 'framer-motion';
import { estiloCategoria, formatFechaCorta, formatFechaLarga } from '../utils/events';

// Clase reutilizable para los 3 botones de acción de cada fila
const estiloBotonAccion =
  'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40';

export default function EventList({ events, onRegister, onUnregister, onDelete, onEdit }) {
  // Si no hay eventos (o el filtro/búsqueda no encontró nada), se muestra
  // un mensaje en vez de una tabla vacía
  if (events.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line py-10 text-center text-mute">
        No hay eventos que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-panel">
      <table className="w-full text-left text-paper">
        <thead className="border-b border-line text-xs font-semibold text-mute">
          <tr>
            <th className="p-4">Evento</th>
            <th className="p-4">Categoría</th>
            <th className="p-4">Cuándo y dónde</th>
            <th className="p-4">Aforo</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {/* initial={false} evita que las filas ya existentes se animen
              al cargar la página por primera vez; solo se animan
              las que se agregan o quitan después */}
          <AnimatePresence initial={false}>
            {events.map((event) => {
              const lleno = event.attendees >= event.capacity;
              const porcentaje = Math.min((event.attendees / event.capacity) * 100, 100);
              const { dia, mes } = formatFechaCorta(event.date);
              const categoria = estiloCategoria(event.category);

              return (
                <motion.tr
                  key={event.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-panel-raised/40"
                >
                  <td className="p-4 font-semibold">{event.title}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span className={`h-1.5 w-1.5 rounded-full ${categoria.punto}`} />
                      <span className={categoria.texto}>{event.category}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-none rounded-md border border-line bg-panel-raised px-2 py-1 text-center leading-none">
                        <div className="text-[10px] font-semibold uppercase text-amber">{mes}</div>
                        <div className="font-display text-sm font-bold">{dia}</div>
                      </div>
                      <div className="text-sm">
                        <div>{formatFechaLarga(event.date)}</div>
                        <div className="text-xs text-mute">{event.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className={lleno ? 'font-bold text-bad' : 'text-good'}>
                        {event.attendees} / {event.capacity}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-panel-raised">
                      <motion.div
                        className={`h-full rounded-full ${lleno ? 'bg-bad' : 'bg-good'}`}
                        initial={false}
                        animate={{ width: `${porcentaje}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      />
                    </div>
                    {lleno && <div className="mt-1 text-[10px] font-bold text-bad">Cupo lleno</div>}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onRegister(event.id)}
                        disabled={lleno}
                        className={`${estiloBotonAccion} border-good text-good hover:bg-good hover:text-ink`}
                      >
                        +1 asistente
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onUnregister(event.id)}
                        disabled={event.attendees === 0}
                        className={`${estiloBotonAccion} border-amber text-amber hover:bg-amber hover:text-ink`}
                      >
                        -1 asistente
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onEdit(event)}
                        className={`${estiloBotonAccion} border-info text-info hover:bg-info hover:text-ink`}
                      >
                        Editar
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => onDelete(event.id)}
                        className={`${estiloBotonAccion} border-bad text-bad hover:bg-bad hover:text-ink`}
                      >
                        Eliminar
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
