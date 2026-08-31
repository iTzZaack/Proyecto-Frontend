// Pie de página fijo al fondo (gracias al "justify-between" del contenedor
// padre en App.jsx). Muestra el año actual automáticamente con Date().
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line py-6 text-center text-sm text-mute">
      <p>
        Desarrollado por{' '}
        <span className="text-gradient font-semibold">Isaac Jarrín</span>
        {' & '}
        <span className="text-gradient font-semibold">Marlon Angulo</span>
      </p>
      <p className="mt-1">© {new Date().getFullYear()} Plataforma de Gestión de Eventos.</p>
    </footer>
  );
}