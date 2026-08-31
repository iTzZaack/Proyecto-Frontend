import { useEffect, useRef, useState } from 'react';

// Anima un número desde su valor actual hasta valorObjetivo cada vez
// que este cambia, usando un easing suave (ease-out cúbico).
export function useCountUp(valorObjetivo, duracion = 500) {
  const [valor, setValor] = useState(valorObjetivo);
  const valorAnterior = useRef(valorObjetivo);

  useEffect(() => {
    const inicio = valorAnterior.current;
    const diferencia = valorObjetivo - inicio;
    if (diferencia === 0) return;

    let frame;
    const tiempoInicio = performance.now();

    const animar = (ahora) => {
      const progreso = Math.min((ahora - tiempoInicio) / duracion, 1);
      const progresoSuave = 1 - Math.pow(1 - progreso, 3);
      setValor(Math.round(inicio + diferencia * progresoSuave));

      if (progreso < 1) {
        frame = requestAnimationFrame(animar);
      } else {
        valorAnterior.current = valorObjetivo;
      }
    };

    frame = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(frame);
  }, [valorObjetivo, duracion]);

  return valor;
}
