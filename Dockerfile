# Imagen base
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de la app
EXPOSE 3001

# Comando por defecto para iniciar la app
CMD ["npm", "start"]
