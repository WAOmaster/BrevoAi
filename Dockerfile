# Cloud Run – Vite dev server (handles TSX at runtime, reads GEMINI_API_KEY from env)
FROM node:20-alpine

WORKDIR /app

# Install deps first so this layer is cached on code-only changes
COPY package.json ./
RUN npm install

COPY . .

# Cloud Run injects PORT=8080; vite.config.ts reads process.env.PORT
EXPOSE 8080

CMD ["npm", "start"]
