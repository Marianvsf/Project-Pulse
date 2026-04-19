# Project-Pulse

Aplicacion web para gestion de proyectos con autenticacion por credenciales, recuperacion de contraseña y panel de seguimiento.

## Estado actual del proyecto

Este repositorio ya no funciona solo con mock data. Actualmente usa:

- Next.js 15 (App Router) con React 19 y TypeScript
- NextAuth (Credentials Provider) con sesiones JWT
- Prisma ORM con SQLite local
- API Routes en Next.js para autenticacion y proyectos
- Zustand para estado de proyectos en cliente
- Chart.js + react-chartjs-2 para visualizaciones

## Funcionalidades principales

- Registro e inicio de sesion con contraseña hasheada (bcryptjs)
- Recuperacion de contraseña con token temporal (hash SHA-256)
- Dashboard con tarjetas y graficos de avance
- CRUD de proyectos desde endpoints internos
- Formularios de creacion/edicion de proyecto
- Expiracion y manejo de sesion en frontend

## Stack tecnologico

| Tecnologia                   | Uso                                         |
| ---------------------------- | ------------------------------------------- |
| Next.js 15                   | Framework fullstack (frontend + API routes) |
| React 19                     | UI                                          |
| TypeScript                   | Tipado estatico                             |
| NextAuth 4                   | Autenticacion y sesiones                    |
| Prisma 6                     | Acceso a base de datos                      |
| SQLite                       | Base local de desarrollo                    |
| Tailwind CSS 4               | Estilos                                     |
| Zustand 5                    | Estado global en cliente                    |
| Chart.js 4 + react-chartjs-2 | Graficas                                    |

## Estructura relevante

```text
src/
  app/
    api/
      auth/
        [...nextauth]/route.ts
        register/route.ts
        forgot-password/route.ts
        reset-password/route.ts
      projects/
        route.ts
        [id]/route.ts
    dashboard/
    login/
    register/
    forgot-password/
    reset-password/
    projects/[id]/
  lib/
    auth.ts
    prisma.ts
    session.ts
prisma/
  schema.prisma
  migrations/
```

## Modelo de datos (Prisma)

### User

- id
- email (unique)
- hashedPassword
- resetPasswordToken (nullable)
- resetPasswordExpiresAt (nullable)
- name (nullable)
- createdAt

### Project

- id
- nombre
- descripcion
- estado
- prioridad
- progreso (0-100)
- tareas (Json)
- equipo (Json)
- fechaInicio
- fechaFin
- createdAt
- updatedAt

## Requisitos

- Node.js 20+
- npm 10+

## Configuracion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env.local` con estas variables:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=pon-un-secreto-largo-y-unico
```

Nota: en desarrollo existe un fallback de secreto para NextAuth, pero en entornos reales debes configurar `NEXTAUTH_SECRET`.

3. Aplicar migraciones y generar cliente Prisma:

```bash
npx prisma migrate dev
```

4. Levantar el proyecto:

```bash
npm run dev
```

5. Abrir en navegador:

```text
http://localhost:3000
```

## Scripts disponibles

- `npm run dev`: inicia entorno de desarrollo
- `npm run build`: genera cliente Prisma y compila Next.js
- `npm run start`: ejecuta la build en modo produccion
- `npm run lint`: corre reglas de lint

## Endpoints API

### Auth

- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET|POST /api/auth/[...nextauth]`

### Projects

- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`

## Notas de desarrollo

- El cliente Prisma se genera en `src/generated/prisma`.
- Si ajustas reglas de ESLint, manten ignorado `src/generated/**` por ser codigo generado.
- El log de `forgot-password` imprime la URL de reseteo en desarrollo para pruebas locales.

## Licencia

Uso academico y de aprendizaje.
