FROM node:18

WORKDIR /app

# Instala dependências necessárias para o PostgreSQL e outras bibliotecas
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Habilita o módulo crypto globalmente (solução alternativa)
RUN echo "global.crypto = require('crypto');" >> /app/node_modules/@nestjs/typeorm/dist/common/typeorm.utils.js

# Por padrão, o container vai rodar o comando de desenvolvimento, que ativa o watch
CMD ["npm", "run", "start:dev"]
