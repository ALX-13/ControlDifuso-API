# Usa Node LTS
FROM node:20

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install --production

# Copia el resto del código
COPY . .

# Expone el puerto (debe coincidir con fly.toml)
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
