FROM node:24.4.1-alpine3.22 AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM node:24.4.1-alpine3.22

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

RUN npm ci --only=production

CMD ["npm", "start"]