FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm deploy --filter=api /build/api
RUN pnpm deploy --filter=web /build/web

FROM base AS api
WORKDIR /app
RUN apk add --no-cache python3 py3-pip wget fuse
RUN wget https://github.com/yandex-cloud/geesefs/releases/latest/download/geesefs-linux-amd64 && chmod a+x geesefs-linux-amd64
RUN pip install pandas numpy
RUN mkdir -p /mnt/bucket
COPY --from=build /build/api /app
CMD ./geesefs-linux-amd64 zakupai /mnt/bucket && pnpm start

FROM base AS web_build
COPY --from=build /build/web /app
WORKDIR /app
RUN pnpm build

FROM nginx:alpine AS web
COPY --from=web_build /app/dist /usr/share/nginx/html
COPY --from=web_build /app/nginx.conf /etc/nginx/conf.d/default.conf
