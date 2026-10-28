# Errores Resueltos — CSP bloqueaba conexión al backend

## Problema
El frontend no mostraba los empleos porque el navegador bloqueaba la petición a `https://backend-xi-weld-67.vercel.app/api/jobs` debido a una política de Content Security Policy (CSP).

**Error en consola:**
```
Connecting to 'https://backend-xi-weld-67.vercel.app/api/jobs' violates the following Content Security Policy directive: "connect-src 'self' https://api.github.com".
```

## Causa
El archivo `02-react/index.html` tenía un meta tag CSP que restringía `connect-src` solo a `'self' https://api.github.com`, sin incluir el dominio del backend.

## Solución
Se agregó `https://backend-xi-weld-67.vercel.app` a la directiva `connect-src` en `02-react/index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://backend-xi-weld-67.vercel.app; form-action 'self'" />
```

## Verificación
- Frontend desplegado: `https://02-react-cyan.vercel.app` (200 OK)
- Backend API: `https://backend-xi-weld-67.vercel.app/api/jobs` (200 OK)
- CSP permite conexión al backend ✅

## Estado
✅ Resuelto — El frontend carga los empleos desde la API del backend correctamente.
