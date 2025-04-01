FROM node:20-alpine AS base
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
 
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo@^2.2.3
COPY . .
 
RUN turbo prune web --docker
 
FROM base AS installer
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile --prefer-offline
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN export NODE_OPTIONS=--max_old_space_size=4096 && yarn turbo run build --filter=web
 
FROM base AS runner
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
    
ENV CHROMIUM_PATH /usr/bin/chromium
RUN yarn global add lighthouse@12.4.0

WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/packages/db ./packages/db
COPY --from=installer --chown=nextjs:nodejs /app/packages/module-accessibility/assets ./packages/module-accessibility/assets
COPY --from=builder --chown=nextjs:nodejs /app/scripts/run.sh .
RUN chmod +x run.sh
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD sh run.sh