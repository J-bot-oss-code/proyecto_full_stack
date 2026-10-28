# Resumen del Proyecto Full Stack — DevJobs API REST

Este documento resume todo el trabajo realizado para mantener contexto en futuras secciones del proyecto.

---

## 1. Visión General

Proyecto full stack para gestión de empleos en tecnología.
- **Frontend:** React + Vite (desplegado en Vercel)
- **Backend:** Node.js + Express como funciones serverless en Vercel
- **Datos:** Almacenamiento en memoria RAM (`jobModel.js`) — listo para migrar a BD real

---

## 2. URLs de Producción

| Componente | URL | Estado |
|------------|-----|--------|
| Frontend | `https://02-react-cyan.vercel.app` | ✅ Activo |
| Backend API | `https://backend-xi-weld-67.vercel.app` | ✅ Activo |
| API Base | `https://backend-xi-weld-67.vercel.app/api/jobs` | ✅ Activo |
| Vercel Analytics (Frontend) | `https://vercel.com/analytics/02-react` | ✅ Activo |

---

## 3. Estructura del Repositorio

```
proyecto_full_stack/
├── backend/                          # API REST con Express
│   ├── api/
│   │   └── index.js                  # Handler serverless para Vercel
│   ├── src/
│   │   ├── app.js                    # App Express con middlewares
│   │   ├── server.js                 # Servidor local (solo desarrollo)
│   │   ├── config/
│   │   │   └── config.js             # Variables de entorno
│   │   ├── controllers/
│   │   │   └── jobController.js      # Lógica de endpoints
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Manejo centralizado de errores
│   │   │   ├── notFound.js           # 404 para rutas inexistentes
│   │   │   └── validate.js           # Validación de entrada (jobs)
│   │   ├── models/
│   │   │   └── jobModel.js           # Modelo de datos (memoria RAM)
│   │   ├── routes/
│   │   │   └── jobRoutes.js          # Rutas del recurso /api/jobs
│   │   └── utils/
│   │       ├── AppError.js           # Clase de error personalizada
│   │       └── asyncHandler.js       # Wrapper para errores async
│   ├── vercel.json                   # Configuración de rutas Vercel
│   ├── .env                          # Variables locales (NO subir a git)
│   ├── .env.example                  # Ejemplo de variables
│   ├── .gitignore                    # Excluye .vercel, node_modules
│   └── package.json                  # Dependencias: express, cors, dotenv, nodemon
├── 02-react/                         # Frontend React + Vite
│   ├── src/
│   │   ├── main.jsx                  # Punto de entrada con Analytics
│   │   ├── app/App.jsx               # Rutas principales con React Router
│   │   ├── index.css
│   │   ├── index.html                # HTML con meta CSP corregido
│   │   └── features/jobs/
│   │       ├── api/
│   │       │   └── jobRepository.js  # Consume API del backend (fetch)
│   │       ├── hooks/
│   │       │   └── useJobs.js        # Hook personalizado para empleos
│   │       ├── pages/
│   │       │   ├── JobsPage.jsx
│   │       │   └── JobDetailPage.jsx
│   │       └── domain/
│   │           ├── filterJobs.js
│   │           └── jobFilters.js
│   ├── vite.config.js                # Configuración de Vite
│   ├── .env                          # Variables locales (NO subir a git)
│   ├── .env.production               # Variables para build de producción
│   ├── .env.example                  # Ejemplo de variables
│   ├── .gitignore                    # Excluye node_modules, dist, .env, .vercel
│   └── package.json                  # Dependencias: react, react-dom, react-router-dom, @vercel/analytics
├── .gitignore                        # Excluye node_modules/, dist/, .env, .env.*
├── codigo.md                         # Códigos y URLs de producción
├── errores.md                        # Documentación de errores y soluciones
└── RESUMEN_PROYECTO.md               # Este archivo
```

---

## 4. Endpoints de la API (Backend)

| Método | Ruta | Descripción | Cuerpo |
|--------|------|-------------|--------|
| GET | `/api/jobs` | Listar todos los empleos | — |
| GET | `/api/jobs/:id` | Obtener empleo por ID | — |
| POST | `/api/jobs` | Crear nuevo empleo | JSON con datos del empleo |
| PUT | `/api/jobs/:id` | Actualizar empleo existente | JSON con datos del empleo |
| DELETE | `/api/jobs/:id` | Eliminar empleo por ID | — |

**Respuesta de ejemplo (GET /api/jobs):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "jobs": [
      {
        "id": "1",
        "title": "Desarrollador Frontend",
        "company": "Tech Solutions",
        "location": "Remoto",
        "technology": "React",
        "technologies": ["React", "JavaScript", "CSS"],
        "contract": "Tiempo completo",
        "experience": "Intermedio",
        "description": "...",
        "responsibilities": ["..."],
        "requirements": ["..."],
        "aboutCompany": "..."
      }
    ]
  }
}
```

---

## 5. Manejo de Errores (Backend)

### Capas de manejo de errores:

1. **`AppError.js`** — Clase personalizada con `statusCode`, `status`, `isOperational`
2. **`asyncHandler.js`** — Wrapper que captura errores async y los pasa a `next()`
3. **`errorHandler.js`** — Middleware centralizado que responde JSON consistente:
   ```json
   {
     "status": "fail" | "error",
     "message": "Descripción del error",
     "stack": "...",        // Solo en desarrollo
     "error": {...}         // Solo en desarrollo
   }
   ```
4. **`notFound.js`** — Middleware para rutas inexistentes (404)
5. **`validate.js`** — Validación de entrada para empleos (campos requeridos, tipos, listas)

### Códigos de respuesta:
- `200` — Éxito (GET, PUT)
- `201` — Creado (POST)
- `204` — Eliminado (DELETE)
- `400` — Error de validación o solicitud malformada
- `404` — Recurso no encontrado
- `500` — Error interno del servidor

---

## 6. Variables de Entorno

### Backend (configuradas en Vercel):
| Variable | Valor | Entorno |
|----------|-------|---------|
| `NODE_ENV` | `production` | Production |
| `CORS_ORIGIN` | `https://02-react-cyan.vercel.app` | Production |
| `PORT` | `3000` | Local/Producción |

### Frontend (configuradas en Vercel):
| Variable | Valor | Entorno |
|----------|-------|---------|
| `VITE_API_URL` | `https://backend-xi-weld-67.vercel.app` | Production |

**Nota:** Las variables con prefijo `VITE_` se exponen al cliente en el build de Vite.

---

## 7. CORS

Configurado en `backend/src/app.js`:
```js
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
```

En producción, `CORS_ORIGIN` está establecido a `https://02-react-cyan.vercel.app`.

---

## 8. Content Security Policy (CSP)

**Problema encontrado:** El navegador bloqueaba `fetch` al backend porque el meta tag CSP en `02-react/index.html` restringía `connect-src` solo a `'self' https://api.github.com`.

**Solución:** Agregado `https://backend-xi-weld-67.vercel.app` a `connect-src` en `02-react/index.html:8`.

---

## 9. Vercel Analytics

- **Paquete:** `@vercel/analytics`
- **Componente:** `<Analytics />` en `02-react/src/main.jsx`
- **Estado:** Activo en producción
- **Dashboard:** `https://vercel.com/analytics/02-react`

---

## 10. Despliegue en Vercel

### Backend:
- Funciones serverless en `backend/api/index.js`
- `vercel.json` en `backend/` con rutas `/api/.+` → `/api/index.js`
- Comando de despliegue: `vercel --prod` desde `backend/`

### Frontend:
- Build de Vite: `npm run build` → `dist/`
- Comando de despliegue: `vercel --prod` desde `02-react/`

---

## 11. Limitaciones Actuales

| Limitación | Detalle | Solución futura |
|------------|---------|-----------------|
| Datos en memoria | `jobModel.js` usa array en RAM; se reinician al redeploy | Migrar a base de datos (MongoDB, PostgreSQL, etc.) |
| Backend serverless | Sin servidor persistente, cold start posible | Migrar a Railway/Render si se necesita servidor persistente |
| Sin autenticación | No hay login/registro de usuarios | Agregar Auth0, Clerk o similar |

---

## 12. Comandos Útiles

```bash
# Backend local
cd backend
npm install
npm run dev      # Desarrollo con nodemon
npm start        # Producción local

# Frontend local
cd 02-react
npm install
npm run dev      # Desarrollo con Vite
npm run build    # Build para producción

# Despliegue en Vercel
cd backend && vercel --prod
cd 02-react && vercel --prod

# Variables de entorno en Vercel
vercel env add VAR_NAME production
vercel env ls
```

---

## 13. Archivos de Documentación Creados

| Archivo | Contenido |
|---------|-----------|
| `codigo.md` | Códigos y URLs de producción |
| `errores.md` | Errores encontrados y soluciones aplicadas |
| `RESUMEN_PROYECTO.md` | Este archivo — resumen completo del proyecto |

---

## 14. Próximos Pasos Sugeridos

1. Conectar una base de datos real (MongoDB Atlas, Supabase, PostgreSQL) para persistencia de datos
2. Agregar autenticación de usuarios (login/registro)
3. Implementar paginación y filtros avanzados en el listado de empleos
4. Agregar tests unitarios y de integración
5. Configurar CI/CD con GitHub Actions para despliegue automático

---

*Última actualización: Octubre 2026*
