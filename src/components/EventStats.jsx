import { useCountUp } from '../hooks/useCountUp';

// Sub-componente para cada tarjeta individual de estadística.
// useCountUp anima el número contando desde el valor anterior hasta
// el nuevo (en vez de que el número simplemente "salte" al cambiar).
function TarjetaEstadistica({ valor, etiqueta }) {
  const valorAnimado = useCountUp(valor);

  return (
    <div className="ticket-card rounded-lg border border-line bg-panel px-5 pb-4 pt-5 transition-transform duration-200 hover:-translate-y-0.5">
      <p className="font-display text-4xl font-bold text-paper">{valorAnimado}</p>
      <div className="ticket-divider mt-3 pt-2">
        <p className="text-sm text-mute">{etiqueta}</p>
      </div>
    </div>
  );
}

export default function EventStats({ events }) {
  // Estos 3 valores se recalculan en cada render a partir de la lista
  // de eventos, no se guardan en un estado propio (derivados, no fuente
  // de verdad) para evitar que se desincronicen de la lista real.
  const totalEventos = events.length;
  const totalAsistentes = events.reduce((suma, evento) => suma + evento.attendees, 0);
  const cuposDisponibles = events.reduce(
    (suma, evento) => suma + Math.max(evento.capacity - evento.attendees, 0),
    0
  );

  const datos = [
    { valor: totalEventos, etiqueta: 'Eventos programados' },
    { valor: totalAsistentes, etiqueta: 'Asistentes registrados' },
    { valor: cuposDisponibles, etiqueta: 'Cupos disponibles' },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {datos.map((dato) => (
        <TarjetaEstadistica key={dato.etiqueta} valor={dato.valor} etiqueta={dato.etiqueta} />
      ))}
    </div>
  );
}
