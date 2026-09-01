// AnimatePresence permite animar la SALIDA de elementos (ej: cuando se
// elimina una fila de la tabla, no desaparece de golpe, se desvanece)
import { AnimatePresence } from 'framer-motion';
import EventItem from './EventItem';

// EventList: componente "lista de registros". Su única responsabilidad
// es dibujar la tabla y recorrer el arreglo de eventos, delegando el
// dibujo de CADA fila a EventItem (componente "elemento individual").
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
            {events.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onRegister={onRegister}
                onUnregister={onUnregister}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}