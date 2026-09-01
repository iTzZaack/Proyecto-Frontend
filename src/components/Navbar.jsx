import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

// Barra de navegación superior. Usa motion.header para que aparezca
// con una animación sutil al cargar la página (se desliza hacia abajo
// mientras aparece), y .text-gradient (definido en index.css) para
// que el título tenga un degradado de color en vez de un color plano.
export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden border-b-2 border-amber bg-panel"
    >
      {/* Brillo decorativo de fondo, hecho solo con CSS (sin imágenes) */}
      <div
        className="pointer-events-none absolute -top-10 left-1/4 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--color-fuchsia)' }}
      />
      <div
        className="pointer-events-none absolute -top-10 right-1/4 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--color-info)' }}
      />

      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 py-6">
        {/* Ícono decorativo (una entrada/ticket, con leve flotación) */}
        <motion.span className="animate-float text-amber" aria-hidden="true">
          <Ticket size={32} strokeWidth={2} />
        </motion.span>
        <h1 className="text-gradient font-display text-3xl font-extrabold tracking-tight">
          Gestión de eventos
        </h1>
      </div>
    </motion.header>
  );
}