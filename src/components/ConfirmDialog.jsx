import { AnimatePresence, motion } from 'framer-motion';

// Diálogo modal reutilizable de confirmación (usado antes de eliminar
// un evento). AnimatePresence permite que se anime también al CERRARSE,
// no solo al abrirse.
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // Fondo oscuro semitransparente que cubre toda la pantalla.
          // Al hacer clic fuera del cuadro (en este fondo), se cancela.
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm rounded-lg border border-line bg-panel p-6"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            // Evita que el clic dentro del cuadro se propague al fondo
            // y cierre el diálogo por accidente
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-bold text-paper">{title}</h3>
            <p className="mt-2 text-sm text-mute">{message}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={onCancel}
                className="rounded-md border border-line px-4 py-2 text-sm text-mute hover:text-paper"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-bad px-4 py-2 text-sm font-semibold text-ink hover:bg-bad/85"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
