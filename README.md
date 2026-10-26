# Proyecto de aprendizaje Full Stack

El proyecto reúne las lecciones de JavaScript, la versión original de la web y su migración a React con Vite.

## Estructura

```text
javascript-js/
  01-variables.js
  02-dataTypes.js
  ...
  20-destructuring-spread-rest.js
  *-exercises.js

00-html-css/
  index.html
  busqueda.html
  detalle-empleo.html
  assets/
  css/
  data/
  js/

02-react/
  src/
    app/
    features/
    shared/
    styles/
  public/data/
  package.json

backend/
  src/
    server.js
  package.json
```

Las lecciones numeradas de `javascript-js` siguen en orden de aprendizaje. Los archivos `*-exercises.js` son espacios de práctica y pueden estar vacíos.

## Ejecutar las lecciones

Desde la raíz del proyecto, ejecuta el archivo que estés estudiando:

```powershell
node .\javascript-js\15-classes.js
```

## Abrir la versión original

Abre `00-html-css\index.html` con la extensión **Live Server** de VS Code. La sección de empleos carga `data\data.json` usando `fetch`, por lo que debe servirse desde un servidor local y no abrirse directamente como archivo.

La versión original está hecha con HTML, CSS y JavaScript nativo; se conserva como referencia del trabajo previo.

## Ejecutar la aplicación React

La versión migrada de DevJobs se encuentra en `02-react` y usa React con Vite.

```powershell
cd .\02-react
npm install
npm run dev
```

Para validar la compilación de producción:

```powershell
npm run build
```

La app incluye inicio, búsqueda y detalle de empleos, un directorio de empresas, referencias salariales ilustrativas, registro e inicio de sesión visuales y un perfil profesional de demostración con espacios para CV, proyectos y certificados. Los datos de empleos se sirven desde `02-react\public\data\data.json`. El registro, el inicio de sesión, la edición del perfil y la carga de CV aún no tienen lógica de backend.

### Iniciar el backend

El backend inicial usa Node.js y Express. Desde la raíz del repositorio:

```powershell
cd .\backend
npm install
npm run dev
```

El servidor inicia en `http://localhost:3000`; comprueba que está activo en `http://localhost:3000/api/health`. Por ahora solo ofrece una ruta de salud: la conexión con la base de datos y la lógica de empleos se agregarán en los siguientes pasos.

### Arquitectura de React

La aplicación usa una arquitectura por funcionalidades con separación ligera por capas:

- `src/app/`: composición de la aplicación, layout y rutas con React Router.
- `src/features/home/`: interfaz y comportamiento de la página de inicio.
- `src/features/jobs/`: páginas y componentes de empleos, filtrado puro de dominio, carga y validación de datos.
- `src/features/companies/` y `src/features/salaries/`: directorio de empresas y referencias salariales de demostración.
- `src/features/auth/`: formularios visuales de registro e inicio de sesión, sin autenticación real.
- `src/features/profile/`: menú de perfil, página profesional, validación de avatares y persistencia local del avatar.
- `src/shared/`: componentes reutilizables entre funcionalidades.
- `src/styles/` y `src/index.css`: estilos de la aplicación y estilos base.

Las páginas coordinan sus componentes; los componentes manejan presentación e interacción local; los hooks reúnen estado y ciclo de vida; los servicios/repositorios aíslan el acceso a APIs y almacenamiento. El hook de empleos recibe el repositorio como función, lo que permite sustituirlo por un doble de prueba sin cambiar la interfaz. `usePagination` encapsula el estado y el cálculo de la página visible, reiniciándose al cambiar la consulta o los filtros.

La navegación SPA usa `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink` y hooks de React Router. Los enlaces internos actualizan la ruta sin solicitar de nuevo el documento HTML; React Router sincroniza el historial Atrás/Adelante con las vistas. En producción, el servidor debe devolver `index.html` para las rutas de la aplicación, por ejemplo `/jobs/software-senior`.

La separación favorece los principios SOLID donde resultan útiles en esta app: responsabilidad única al separar vistas, dominio y persistencia; extensión de filtros mediante configuración y reglas de dominio; contratos de datos validados para las vistas; componentes con props pequeñas; e inversión de dependencias en el límite del repositorio. No se introduce una jerarquía artificial de clases: el dominio se expresa con funciones puras y módulos JavaScript.

## Avatar de perfil

El menú **Mi perfil** permite usar el avatar público de GitHub, una imagen alojada en una URL HTTPS o un archivo PNG, JPEG o WebP. El nombre y el avatar se guardan en `localStorage` de ese navegador y no se sincronizan entre dispositivos. La opción de GitHub muestra una imagen pública; no inicia sesión ni reemplaza una integración OAuth con backend.
