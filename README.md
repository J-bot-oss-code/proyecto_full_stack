# Proyecto de aprendizaje Full Stack

El proyecto está dividido por temas para que las lecciones y la web de práctica sean fáciles de encontrar.

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
```

Las lecciones numeradas de `javascript-js` siguen en orden de aprendizaje. Los archivos `*-exercises.js` son espacios de práctica y pueden estar vacíos.

## Ejecutar las lecciones

Desde la raíz del proyecto, ejecuta el archivo que estés estudiando:

```powershell
node .\javascript-js\15-classes.js
```

## Abrir la web

Abre `00-html-css\index.html` con la extensión **Live Server** de VS Code. La sección de empleos carga `data\data.json` usando `fetch`, por lo que debe servirse desde un servidor local y no abrirse directamente como archivo.

La web está hecha con HTML, CSS y JavaScript nativo. La organización actual no usa React.

## Avatar de perfil

El menú **Mi perfil** permite usar el avatar público de GitHub, una imagen alojada en una URL HTTPS o un archivo PNG, JPEG o WebP. El nombre y el avatar se guardan en `localStorage` de ese navegador y no se sincronizan entre dispositivos. La opción de GitHub muestra una imagen pública; no inicia sesión ni reemplaza una integración OAuth con backend.
