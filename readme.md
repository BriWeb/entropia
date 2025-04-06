# Entropía - Sistema Web

Proyecto fullstack educativo.
Desarrollado por equipo "**entropia**", para la materia **Desarrollo de Sistemas de Información orientados a la gestión y apoyo a las decisiones** del IFTS11, con frontend en **React** y backend en **Node.js** + **SQL Server**.

---

## 📁 Estructura del Proyecto

```
entropia/
├── backend/     # Servidor Node.js con Express
│   ├── routes/
│   ├── controllers/
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
git clone https://github.com/usuario/entropia.git
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
cd frontend
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
NODE_SERVER=localhost
NODE_PORT=3000
```

---

## ▶️ Cómo levantar el proyecto

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 📦 Build del frontend

Para generar el build de React:

```bash
cd frontend
npm run build
```

Esto genera una carpeta `dist/` que podés servir desde el backend o subir a un hosting.

---

## 👨‍💻 Autores

- Equipo de compañeros – _Estudiantes en formación_
- Luis Herrera – _Frontend_
- Federico Estevez – _Backend_
- Iara Baya – _Full Stack_
- Brian Herrera – _DBA_

---
