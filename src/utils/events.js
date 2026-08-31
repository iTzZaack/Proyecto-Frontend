const MESES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

const DIAS_SEMANA = [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado',
];

// new Date("AAAA-MM-DD") lo interpreta en UTC y puede mostrar un día
// menos según la zona horaria, por eso se arma la fecha manualmente.
export function parseFechaLocal(fechaISO) {
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

export function formatFechaCorta(fechaISO) {
  const fecha = parseFechaLocal(fechaISO);
  return {
    dia: fecha.getDate(),
    mes: MESES[fecha.getMonth()],
  };
}

export function formatFechaLarga(fechaISO) {
  const fecha = parseFechaLocal(fechaISO);
  const diaSemana = DIAS_SEMANA[fecha.getDay()];
  const texto = `${diaSemana}, ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const CATEGORIAS = ['Conferencia', 'Taller', 'Deportes', 'Social'];

const ESTILOS_CATEGORIA = {
  Conferencia: { texto: 'text-info', punto: 'bg-info' },
  Taller: { texto: 'text-plum', punto: 'bg-plum' },
  Deportes: { texto: 'text-good', punto: 'bg-good' },
  Social: { texto: 'text-amber', punto: 'bg-amber' },
};

export function estiloCategoria(categoria) {
  return ESTILOS_CATEGORIA[categoria] ?? { texto: 'text-mute', punto: 'bg-mute' };
}
