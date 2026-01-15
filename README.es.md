# Express REST Starter

Este es un proyecto de inicio para una API REST con Express.js, TypeScript y SQL Server.

**Nota:** La rama `main` está adaptada para usar PostgreSQL en lugar de SQL Server.

## Prerrequisitos

- Node.js (versión 18 o superior)
- pnpm
- PostgreSQL

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd express-rest-starter
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edita el archivo `.env` con tus valores:
     ```
     PORT=443
     DB_SERVER=tu-servidor-postgresql
     DB_PORT=5432
     DB_NAME=tu-base-de-datos
     DB_USER=tu-usuario
     DB_PASSWORD=tu-contraseña
     JWT_SECRET=tu-secreto-jwt
     ```

## Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
pnpm run dev
```

Esto iniciará el servidor con recarga automática usando `tsx watch`.

## Producción

1. Construye el proyecto:

   ```bash
   pnpm run build
   ```

2. Instala PM2 globalmente (si no lo tienes):

   ```bash
   npm install -g pm2
   ```

3. Inicia la aplicación con PM2:

   ```bash
   pnpm run start
   ```

   O directamente:

   ```bash
   pm2 start dist/server.js --name express-rest-starter
   ```

   Para iniciar en producción con build automático:

   ```bash
   pnpm run start:prod
   ```

## Scripts Disponibles

- `pnpm run dev`: Ejecuta en modo desarrollo con recarga automática.
- `pnpm run build`: Compila TypeScript a JavaScript.
- `pnpm run start`: Inicia la aplicación con PM2.
- `pnpm run start:prod`: Construye y inicia en producción.

## Estructura del Proyecto

- `src/app.ts`: Configuración principal de Express.
- `src/server.ts`: Punto de entrada del servidor.
- `src/certs/`: Certificados SSL para el dominio.
- `src/config/env.ts`: Configuración de variables de entorno.
- `src/controllers/`: Controladores de la API.
- `src/database/connection.ts`: Conexión a la base de datos.
- `src/middlewares/`: Middlewares personalizados.
- `src/models/`: Modelos de datos.
- `src/routes/`: Definición de rutas.
- `src/utils/`: Utilidades.

## Licencia

ISC
