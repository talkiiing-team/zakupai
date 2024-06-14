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
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install pandas numpy
COPY --from=build /build/api /app
WORKDIR /app
CMD [ "pnpm", "dev" ]

FROM base AS web_build
COPY --from=build /build/web /app
WORKDIR /app
RUN pnpm build

FROM nginx:alpine AS web
COPY --from=web_build /app/dist /usr/share/nginx/html
COPY --from=web_build /app/nginx.conf /etc/nginx/conf.d/default.conf
