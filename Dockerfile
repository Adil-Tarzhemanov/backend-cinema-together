FROM node:20 AS base

WORKDIR /app

RUN npm install -g npm@latest

FROM base AS deps

COPY package*.json ./
RUN npm ci

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate && npm run build

FROM base AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY prisma ./prisma
COPY uploads ./uploads

EXPOSE 4200

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]


