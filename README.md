# SKM Workshop Management System

Sistema integral de gestion para talleres mecanicos de motocicletas, desarrollado con una arquitectura moderna de alto rendimiento. El sistema permite el control total de clientes, vehiculos, ordenes de servicio, inventario y auditoria.

## Tecnologias Utilizadas

### Backend
- Node.js y Express.js
- Prisma ORM para gestion de base de datos MySQL.
- JWT para autenticacion segura.
- Winston para registro de logs.
- Express Validator para sanitizacion de datos.

### Frontend
- React.js con Vite.
- Tailwind CSS para el diseño de interfaz.
- TanStack Query (React Query) para gestion de estado de servidor.
- Zustand para estado global.
- Framer Motion para animaciones.

## Requisitos Previos

- Node.js version 18 o superior.
- MySQL Server 8.0 o superior.
- Gestor de paquetes npm.

## Configuracion del Entorno

### Backend
1. Navegar al directorio backend: `cd backend`
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` basado en la siguiente estructura:
   ```env
   DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_bd"
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=tu_clave_secreta
   JWT_REFRESH_SECRET=tu_clave_refresh_secreta
   ```
4. Generar el cliente de Prisma: `npx prisma generate`
5. Ejecutar las migraciones: `npx prisma migrate dev`

### Frontend
1. Navegar al directorio frontend: `cd frontend`
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` con la URL de la API:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

## Ejecucion en Desarrollo

Para iniciar el sistema de forma local, ejecute los siguientes comandos en terminales separadas:

### Iniciar Backend
```bash
cd backend
npm run dev
```

### Iniciar Frontend
```bash
cd frontend
npm run dev
```

## Credenciales de Prueba

Para el entorno de desarrollo, se pueden utilizar las siguientes cuentas (contraseña unica para todas):

**Password:** `Admin123!`

- **Admin:** `admin@skm.com`
- **Supervisor:** `supervisor@skm.com`
- **Mecanico:** `mecanico@skm.com`
- **Recepcion:** `recepcion@skm.com`

## Roles y Permisos

El sistema utiliza un esquema de permisos basado en roles (RBAC):

- **Administrador:** Acceso total, gestion de usuarios, auditoria de cambios y reportes financieros.
- **Supervisor:** Gestion operativa, acceso a reportes y auditoria, gestion de inventario y proveedores.
- **Mecanico:** Gestion de servicios, diligenciamiento de checklists y consulta de historial tecnico.
- **Recepcion:** Registro de clientes, ingreso de motocicletas y creacion de ordenes de servicio.

## Estructura del Proyecto

- `/backend`: Contiene la API REST, modelos de base de datos y logica de negocio.
  - `/src/modules`: Division por funcionalidades (auth, clients, services, etc).
  - `/prisma`: Esquema de base de datos y migraciones.
- `/frontend`: Contiene la aplicacion cliente SPA.
  - `/src/components`: Componentes reutilizables de la interfaz.
  - `/src/hooks`: Logica de React compartida.
  - `/src/store`: Gestion de estado con Zustand.

## Despliegue con Docker

El proyecto incluye un archivo Dockerfile optimizado para despliegues en produccion (como Railway o servicios similares) utilizando builds de multiples etapas para reducir el tamaño de la imagen final.

Para construir y ejecutar localmente con Docker:
```bash
docker build -t skm-system .
docker run -p 8080:8080 skm-system
```

## Notas Adicionales

- El sistema utiliza un puerto por defecto de 5000 para el backend y 5173 para el frontend (Vite).
- Los logs del sistema en produccion se envian directamente a la salida estandar (stdout/stderr) para cumplimiento con los estandares de contenedores.
- La carga de archivos (fotos y firmas) se gestiona en el directorio /uploads del backend.
