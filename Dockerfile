# ───────────────────────────────────────────────────────────
# Etapa 1: Instalar dependencias
# ───────────────────────────────────────────────────────────
FROM node:18-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --only=production && npm cache clean --force

# ───────────────────────────────────────────────────────────
# Etapa 2: Imagen final mínima
# ───────────────────────────────────────────────────────────
FROM node:18-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends tini && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

RUN groupadd -r appgroup && \
    useradd -r -g appgroup -s /bin/false -c "App User" appuser

WORKDIR /app
RUN chown -R appuser:appgroup /app

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

COPY --chown=appuser:appgroup . .

ENV NODE_ENV=production \
    PORT=3000 \
    NODE_OPTIONS="--max-old-space-size=512"

USER appuser
EXPOSE 3000

HEALTHCHECK CMD node -e "require('http').get('http://localhost:3000/health', r=>r.statusCode===200?process.exit(0):process.exit(1))"

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "src/server.js"]