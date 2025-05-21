# Entropía - Sistema Web

Proyecto fullstack educativo.
Desarrollado por equipo "**entropia**", para la materia **Desarrollo de Sistemas de Información orientados a la gestión y apoyo a las decisiones** del IFTS11, con frontend en **Next.js** y backend en **Node.js** + **SQL Server**.

---

## 📁 Estructura del Proyecto

```
entropia/
├── backend/     # Servidor Node.js con Express
│   ├── auth/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── src/
│   ├── index.js
│   └── .env
├── frontend/    # Cliente en React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

---

## 🔧 Configuración Inicial

### 1. Clonar el proyecto

```bash
git clone https://github.com/BriWeb/entropia.git
cd entropia
```

### 2. Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🌐 Variables de entorno

### Backend (`backend/.env`)

```env
DB_SERVER_NUBE=servidor-de-bases-sqlserver.database.windows.net
DB_SERVER_LOCAL=localhost
DB_PORT=1433
DB_NAME=entropia
DB_USER=
DB_PASSWORD_LOCAL=
DB_PASSWORD_NUBE=
NODE_PORT=3001
JWT_SECRET_KEY=ENTROPIA
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```

---

## ▶️ Cómo levantar el proyecto

### Backend

```bash
cd ../backend
npm run dev
```

### Frontend

```bash
cd ../frontend
npm run dev
```

---

## 📦 Build del frontend

Para generar el build de Next:

```bash
cd frontend
npm run build
```

Esto genera una carpeta `.next/` para servir desde el backend o subir a un hosting.

---

## 👨‍💻 Autores

- Equipo de compañeros – _Estudiantes en formación_
- Luis Herrera – _Frontend_
- Federico Estevez – _Backend_
- Iara Baya – _Full Stack_
- Brian Herrera – _DBA_

---

## 💡 Funcionalidad

Un sistema de **gestión de consultas médicas**.
El sistema lo utiliza el personal de recepción y médicos.
El sistema almacena los datos del paciente para ver el historial de turnos asignados a éste.

El personal de recepción puede:

- ingresar a su cuenta y modificar sus datos personales;
- ver en la pantalla principal los horarios de los médicos separados por categorías (clínico, cardiólogo, dermatólogo, ginecólogo, pediatra, traumatólogo, etc);
- asignar un turno a un médico en un horario disponible;
- observar el historial clínico de un paciente.

El médico puede:

- ingresar a su cuenta y modificar sus datos personales;
- visualizar los turnos que tiene asignados;
- cambiar el estado del turno a “atendiendo”;
- cambiar el estado del turno a “finalizado”.

#### Descripción del sistema:

El personal de recepción comunica a los pacientes los horarios disponibles de la especialidad médica solicitada. De haber un médico disponible, puede asignar un turno.

El paciente proporciona su documento, y de encontrarse previamente en la base de datos el sistema lo detecta y autocompleta los campos con sus datos. Pero, de no encontrarse en el sistema, se le solicitará toda la información, y al dar de alta el turno se guardarán los datos para su posterior uso.

El turno creado tendrá los datos del médico, del recepcionista, y del paciente.

El médico da por iniciada la sesión, y cumplida su tarea la da por finalizada. Puede agregar una observación al turno.

---
