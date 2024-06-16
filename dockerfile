# Stage 1: Build
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine as run

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "run", "preview"]
