# === BUILD FRONTEND ===
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY NeoWs-frontend/ ./
RUN npm install
RUN npm run build

# === BUILD BACKEND ===
FROM node:18 AS backend

WORKDIR /app
COPY NeoWs-backend/ ./
COPY --from=frontend /app/frontend/dist ./public
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
