Este proyecto es un sistema de gestión de empleados y nómina que incluye autenticación, control de roles (admin y empleado), y una interfaz moderna desarrollada con React + Vite + TypeScript.



-----------------------------------------------------------------------------------------------------------------

Tecnologías utilizadas

Backend

Node.js

Express

MongoDB Atlas (vía Mongoose)

TypeScript

JWT (autenticación)

dotenv

Frontend

Vite

React + TypeScript

React Router DOM

CSS personalizado (basado en diseño Figma)



-----------------------------------------------------------------------------------------------------------------


Instalación y ejecución

Requisitos previos:

Node.js y npm

MongoDB Atlas (URI de conexión)

1. Clonar el repositorio

git clone https://github.com/JUNIBASTH/Pay_Project.git
cd Pay_Project

2. Variables de entorno

Crear un archivo .env dentro de la carpeta backend:

PORT=5000
MONGODB_URI=<tu_uri_de_mongo>
JWT_SECRET=<una_clave_secreta_segura>

3. Instalar dependencias

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

4. Ejecutar los servidores

Backend

npm run dev

Frontend

npm run dev


-----------------------------------------------------------------------------------------------------------------

Rutas principales

Autenticación

POST /api/auth/login: iniciar sesión

POST /api/auth/register: registrar nuevo usuario (solo admin)

Usuarios (admin)

GET /api/users: listar usuarios

POST /api/users: crear usuario

Empleados

GET /api/employees: ver lista

POST /api/employees: agregar nuevo (solo admin)


-----------------------------------------------------------------------------------------------------------------

Estructura del proyecto

Pay_Project/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.ts
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── tsconfig.json
├── .env
├── README.md


-----------------------------------------------------------------------------------------------------------------

Características

Login con token JWT

Rutas protegidas por rol (admin, user)

Dashboard con lista de empleados

Formulario para agregar empleados (solo admin)

Estilo basado en diseño Figma


-----------------------------------------------------------------------------------------------------------------

Pendientes / To-Do

Recuperación de contraseña

Paginación y filtros en la lista de empleados

Visualización de perfil individual por rol



