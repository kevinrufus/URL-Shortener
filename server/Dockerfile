# Stage 1 - Build the base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY src ./src

# Stage 2 - Build the app
FROM base AS build
WORKDIR /app
RUN npm run build

# Stage 3 - Production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only-production
COPY --from=build /app/dist ./

CMD ["node", "index.js"]