FROM node:18.19.1

# Build frontend
WORKDIR /app/frontend
COPY NeoWs-frontend/ ./
RUN npm install
RUN npm run build

# Build backend
WORKDIR /app
COPY NeoWs-backend/ ./
COPY --from=0 /app/frontend/dist ./public
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
