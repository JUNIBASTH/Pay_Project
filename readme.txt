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

Pay_Project es una aplicación web para gestionar planillas (nóminas), empleados, pagos, horas extra, bonos y deducciones. Está pensada para pequeñas empresas que buscan automatizar su gestión de pagos.

Este documento te guiará paso a paso para que puedas instalar y usar el proyecto, aunque no tengas experiencia previa en programación.

 Requisitos antes de empezar
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu computadora:

Node.js (versión 18 o superior)

Git

MongoDB (puedes usar MongoDB local o un servicio en la nube como Atlas)

 1. Clonar el proyecto
Abre la terminal (o consola) y escribe este comando para descargar el proyecto en tu computadora:

bash
Copiar
Editar
git clone https://github.com/JUNIBASTH/Pay_Project.git
Luego entra a la carpeta del proyecto:

bash
Copiar
Editar
cd Pay_Project
 2. Instalar las dependencias
Este proyecto tiene dos partes: el servidor (backend) y la interfaz web (frontend). Hay que instalar las dependencias en ambas.

🔧 Backend (servidor)
bash
Copiar
Editar
cd server
npm install
 Frontend (interfaz)
Abre otra terminal (o vuelve atrás):

bash
Copiar
Editar
cd ../client
npm install
⚙️ 3. Configurar las variables de entorno
En la carpeta server, crea un archivo llamado .env con el siguiente contenido:

env
Copiar
Editar
PORT=5000
MONGO_URI=mongodb://localhost:27017/pay_project
JWT_SECRET=mitokensecreto
 Nota: Puedes cambiar JWT_SECRET por una palabra secreta que tú elijas. Si usas MongoDB Atlas, reemplaza MONGO_URI con tu cadena de conexión de Atlas.

 4. Iniciar el servidor y la interfaz
 Iniciar el servidor
Desde la carpeta server:

bash
Copiar
Editar
npm run dev
El servidor se iniciará en http://localhost:5000.

 Iniciar la interfaz
Desde la carpeta client:

bash
Copiar
Editar
npm run dev
La aplicación web se abrirá en http://localhost:5173 o una dirección parecida.

 5. Acceder y probar
Abre tu navegador web y entra a:


http://localhost:5173
Desde ahí podrás:

Crear usuarios

Agregar empleados

Crear planillas

Registrar pagos, horas extra, deducciones y más

 Problemas comunes
MongoDB no se conecta: Asegúrate de que el servicio de MongoDB esté corriendo. Si usas Atlas, revisa que el URI sea correcto.

Ingresa tu IP en MongoAtlas con el usuario, solo asi se te permitirá acceder

Error en consola ECONNREFUSED o 404: Verifica que tanto el servidor como la interfaz estén corriendo.


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


nombre: 'Super Admin',
  email: 'admin@empresa.com',
  password: '$2b$10$JjdZh1R8JqVxakP4blfZ/uRhl8EJqXuLezjwoouAmGXXtGBJRQpMO',
  rol: 'admin',
  _id: new ObjectId('67f37ec581d870f8106416db'),
  __v: 0


  email: 'admin@gmail.com',
  password: 'admin123',
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



