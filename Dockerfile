# === Build frontend ===
FROM node:18.19.1 AS frontend

WORKDIR /app/frontend
COPY NeoWs-frontend/ ./
RUN npm install
RUN npm run build

# === Build backend ===
FROM node:18.19.1 AS backend

WORKDIR /app
COPY NeoWs-backend/ ./
COPY --from=frontend /app/frontend/dist ./public
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
