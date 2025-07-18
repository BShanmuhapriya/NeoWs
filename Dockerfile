# === BUILD FRONTEND ===
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY Neows-frontend/ ./
RUN npm install
RUN npm run build

# === BUILD BACKEND ===
FROM node:18 AS backend

WORKDIR /app
COPY Neows-backend/ ./
COPY --from=frontend /app/frontend/dist ./public
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
