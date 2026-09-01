# Plataforma Web de Gestión de Eventos - CENESTUR

Proyecto de Front-End para la carrera de Desarrollo de Software. Permite crear, editar, eliminar y consultar eventos, registrar y quitar asistentes, filtrar por categoría y ver estadísticas de participación.

## Tecnologías utilizadas
* **HTML5:** etiquetas semánticas (`header`, `main`, `footer`), formularios y tablas.
* **CSS3 + Tailwind CSS 4:** diseño responsivo, Flexbox, Grid y variables de tema propias.
* **JavaScript ES6+:** métodos de arreglos (`map`, `filter`, `reduce`), manejo de estado y `LocalStorage`.
* **React 19:** componentes reutilizables, Hooks (`useState`, `useEffect`) y comunicación por Props.
* **Framer Motion:** animaciones y transiciones (entrada de secciones, filtros, barra de aforo, modal de confirmación).
* **Vite:** entorno de desarrollo y empaquetado.

## Funcionalidades
1. **CRUD de eventos:** crear, editar y eliminar eventos.
2. **Registro de asistentes:** sumar (+1) o quitar (-1) participantes, respetando el cupo máximo y sin bajar de 0.
3. **Búsqueda y filtros:** por título, lugar y categoría (Conferencia, Taller, Deportes, Social).
4. **Estadísticas:** total de eventos, asistentes registrados y cupos disponibles, con animación de conteo.
5. **Persistencia:** los datos se guardan en `LocalStorage` y se recuperan al abrir la app.
6. **Validaciones:** el formulario no permite guardar con campos vacíos.
7. **Interacciones animadas:** filtro de categorías con selector deslizante, barra de aforo animada, números que cuentan al cambiar, y modal de confirmación al eliminar (en vez del `confirm()` del navegador).

## Estructura del proyecto
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── EventForm.jsx
│   ├── SearchAndFilter.jsx
│   ├── EventStats.jsx
│   ├── EventList.jsx
│   ├── ConfirmDialog.jsx   # modal de confirmación antes de eliminar
│   └── Footer.jsx
├── hooks/
│   └── useCountUp.js       # animación de conteo para las estadísticas
├── utils/
│   └── events.js           # formato de fechas y colores por categoría
├── App.jsx                 # estado principal y lógica de la app
├── main.jsx
└── index.css                # tema de colores y animaciones (Tailwind)
```

## Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/iTzZaack/Proyecto-Frontend.git
   cd Proyecto-Frontend
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Levantar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
   Esto abre la aplicación en `http://localhost:5173`.

4. Generar la versión de producción (opcional):
   ```bash
   npm run build
   npm run preview
   ```

## Solución de problemas comunes

* **Error de PowerShell ("la ejecución de scripts está deshabilitada")**: abrir PowerShell como administrador y ejecutar:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
* **Error `ENOSPC: no space left on device`**: liberar espacio en el disco donde está el proyecto antes de correr `npm install`.

## Autores
Isaac Jarrín & Marlon Angulo — Proyecto desarrollado para CENESTUR, Carrera de Desarrollo de Software.