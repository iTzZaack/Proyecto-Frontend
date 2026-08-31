import { motion } from 'framer-motion';
import { CATEGORIAS } from '../utils/events';

// "Todas" + las categorías definidas en utils/events.js
const OPCIONES = ['Todas', ...CATEGORIAS];

export default function SearchAndFilter({ search, setSearch, filterCategory, setFilterCategory }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg border border-line bg-panel p-4 md:flex-row md:items-center">
      <input
        type="text"
        placeholder="Buscar por título o lugar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-md border border-line bg-panel-raised p-2 text-paper placeholder-mute focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
      />
      {/* Filtro de categoría como "chips" (botones) en vez de un <select>,
          para que sea más visual e interactivo */}
      <div className="flex flex-wrap gap-1 rounded-md border border-line bg-panel-raised p-1">
        {OPCIONES.map((categoria) => {
          const activa = filterCategory === categoria;
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setFilterCategory(categoria)}
              className="relative rounded px-3 py-1.5 text-sm font-medium"
            >
              {/* layoutId hace que el fondo ámbar se "deslice" de un chip
                  a otro en vez de aparecer y desaparecer de golpe:
                  framer-motion detecta que es el mismo elemento animado
                  y calcula la transición automáticamente */}
              {activa && (
                <motion.span
                  layoutId="chip-activo"
                  className="absolute inset-0 rounded bg-amber"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative ${activa ? 'text-ink' : 'text-mute hover:text-paper'}`}>
                {categoria}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
