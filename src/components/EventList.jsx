import { useState, useEffect } from 'react';

export default function EventList({ events, onRegister, onUnregister, onDelete, onEdit }) {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [now, setNow] = useState(new Date());

  // Actualiza el reloj cada 10 segundos, para que la etiqueta de
  // "Finalizado" aparezca sola en cuanto se cumple la fecha del evento,
  // sin necesidad de recargar la página.
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (events.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line py-10 text-center text-mute">
        No hay eventos registrados que coincidan con la búsqueda.
      </p>
    );
  }

  // Límite de visualización por páginas
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const checkIfExpired = (dateString) => {
    if (!dateString) return false;
    const eventDate = new Date(dateString);
    return eventDate < now;
  };

  return (
    <div className="space-y-4">
      {/* Control de Límite de Eventos */}
      <div className="flex items-center justify-between rounded-lg border border-line bg-panel p-3 text-sm">
        <span className="text-mute">
          Mostrando <strong className="text-amber">{currentEvents.length}</strong> de{' '}
          <strong className="text-amber">{events.length}</strong> eventos
        </span>
        <div className="flex items-center gap-2">
          <label className="text-xs text-mute">Límite por página:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded border border-line bg-panel-raised px-2 py-1 text-xs text-paper focus:outline-none"
          >
            <option value={5}>5 eventos</option>
            <option value={10}>10 eventos</option>
            <option value={20}>20 eventos</option>
            <option value={50}>50 eventos</option>
          </select>
        </div>
      </div>

      {/* Tabla de Registros */}
      <div className="overflow-x-auto rounded-lg border border-line bg-panel">
        <table className="w-full text-left text-paper">
          <thead className="border-b border-line text-xs font-semibold uppercase text-mute">
            <tr>
              <th className="p-4">Evento / Requerimientos</th>
              <th className="p-4">Categoría / Estado</th>
              <th className="p-4">Cuándo y dónde</th>
              <th className="p-4">Aforo</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {currentEvents.map((event) => {
              const isFull = event.attendees >= event.capacity;
              const isExpired = checkIfExpired(event.date);

              return (
                <tr key={event.id} className="align-top hover:bg-panel-raised/40">
                  <td className="p-4">
                    <div className="text-base font-bold text-paper">{event.title}</div>
                    {event.organizer && (
                      <div className="mb-1 text-xs text-amber">Organiza: {event.organizer}</div>
                    )}

                    {event.indicaciones?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {event.indicaciones.map((ind, idx) => (
                          <span
                            key={idx}
                            className="rounded border border-line bg-panel-raised px-2 py-0.5 text-[10px] text-mute"
                          >
                            ✓ {ind}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 space-y-0.5 text-[11px] text-mute">
                      {event.decoracion && (
                        <div>
                          🎨 Decoración: <span className="text-paper">{event.decoracion}</span>
                        </div>
                      )}
                      {event.comidas?.length > 0 && (
                        <div>
                          🍽️ Menú: <span className="text-paper">{event.comidas.join(', ')}</span>
                        </div>
                      )}
                      {event.personalCatering?.length > 0 && (
                        <div>
                          👥 Personal: <span className="text-paper">{event.personalCatering.join(', ')}</span>
                        </div>
                      )}
                      {event.notasCatering && (
                        <div>
                          📝 Notas: <span className="italic text-mute">{event.notasCatering}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="mb-2 block w-fit rounded-full border border-line bg-panel-raised px-2.5 py-1 text-xs font-semibold text-amber">
                      {event.category}
                    </span>

                    {isExpired ? (
                      <span className="inline-block rounded-full border border-bad bg-bad/15 px-2 py-0.5 text-xs font-bold text-bad">
                        ⏰ Evento Finalizado
                      </span>
                    ) : (
                      <span className="inline-block rounded-full border border-good bg-good/15 px-2 py-0.5 text-xs font-bold text-good">
                        🟢 A Tiempo / Vigente
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-sm">
                    <div>📅 {event.date ? new Date(event.date).toLocaleString() : 'N/A'}</div>
                    <div className="mt-1 text-xs text-mute">📍 {event.location}</div>
                  </td>

                  <td className="p-4 text-sm">
                    <span className={isFull ? 'font-bold text-bad' : 'text-good'}>
                      {event.attendees} / {event.capacity}
                    </span>
                    {isFull && <div className="text-[10px] font-bold text-bad">Aforo Completo</div>}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-1">
                        <button
                          onClick={() => onRegister(event.id)}
                          disabled={isFull || isExpired}
                          className="rounded border border-good px-2 py-1 text-xs font-medium text-good transition-colors hover:bg-good hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +1 Asistente
                        </button>
                        <button
                          onClick={() => onUnregister(event.id)}
                          disabled={event.attendees <= 0}
                          className="rounded border border-amber px-2 py-1 text-xs font-medium text-amber transition-colors hover:bg-amber hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          -1 Asistente
                        </button>
                      </div>
                      <div className="mt-1 flex gap-1">
                        <button
                          onClick={() => onEdit(event)}
                          className="rounded border border-info px-3 py-1 text-xs font-medium text-info transition-colors hover:bg-info hover:text-ink"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(event.id)}
                          className="rounded border border-bad px-3 py-1 text-xs font-medium text-bad transition-colors hover:bg-bad hover:text-ink"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Navegación por Páginas */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded border border-line px-3 py-1 text-xs text-mute hover:text-paper disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-xs text-mute">
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded border border-line px-3 py-1 text-xs text-mute hover:text-paper disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}