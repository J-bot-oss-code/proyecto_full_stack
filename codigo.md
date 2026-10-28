# Códigos y URLs de Producción

## Despliegue en Vercel

### Backend (API REST - Express)
- **URL de producción:** `https://backend-xi-weld-67.vercel.app`
- **Endpoint base:** `https://backend-xi-weld-67.vercel.app/api/jobs`
- **Endpoint detalle:** `https://backend-xi-weld-67.vercel.app/api/jobs/:id`
- **Estado:** Activo en producción

### Frontend (React + Vite)
- **URL de producción:** `https://02-react-cyan.vercel.app`
- **Estado:** Activo en producción

## Variables de Entorno Configuradas en Vercel

### Backend
| Variable | Valor | Entorno |
|----------|-------|---------|
| `NODE_ENV` | `production` | Production |
| `CORS_ORIGIN` | `https://02-react-cyan.vercel.app` | Production |

### Frontend
| Variable | Valor | Entorno |
|----------|-------|---------|
| `VITE_API_URL` | `https://backend-xi-weld-67.vercel.app` | Production |

## Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/jobs` | Listar todos los empleos |
| GET | `/api/jobs/:id` | Obtener empleo por ID |
| POST | `/api/jobs` | Crear nuevo empleo |
| PUT | `/api/jobs/:id` | Actualizar empleo existente |
| DELETE | `/api/jobs/:id` | Eliminar empleo por ID |

## Ejemplos de Uso (cURL)

```bash
# Listar empleos
curl https://backend-xi-weld-67.vercel.app/api/jobs

# Obtener empleo por ID
curl https://backend-xi-weld-67.vercel.app/api/jobs/1

# CORS preflight (desde el frontend)
curl -s -H "Origin: https://02-react-cyan.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS https://backend-xi-weld-67.vercel.app/api/jobs -D -
```

## Notas

- Los datos se almacenan en memoria RAM (`jobModel.js`). Al redeployar el backend, los datos se reinician.
- Para persistencia permanente, migrar `jobModel.js` a una base de datos (MongoDB, PostgreSQL, etc.).
- El backend funciona en Vercel como funciones serverless (sin `app.listen`).

## Vercel Analytics

- **Paquete instalado:** `@vercel/analytics`
- **Componente configurado:** `<Analytics />` en `src/main.jsx`
- **URL para ver métricas:** `https://vercel.com/analytics/02-react`
- **Estado:** Activo en producción

