# -------- Base image to build and install dependencies --------
FROM node:22-alpine AS build

WORKDIR /app

COPY app .

RUN npm ci --omit=dev

FROM node:22-alpine AS runtime

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nodejs -G node

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/config ./config

RUN chown -R nodejs:nodejs /app && \
    chmod -R 755 /app

USER nodejs

EXPOSE 9002

CMD ["node", "dist/index.js"]

