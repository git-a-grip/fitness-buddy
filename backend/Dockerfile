# Stage 1: Frontend build
FROM node:20-alpine AS frontend-build
WORKDIR /fe
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend + serve frontend static
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache postgresql-client bash
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev
COPY backend/ ./
COPY --from=frontend-build /fe/dist ./public
EXPOSE 3000
CMD ["node", "src/index.js"]
