FROM node:22-bullseye AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm deploy --filter=api /build/api
RUN pnpm deploy --filter=web /build/web

FROM base AS api
WORKDIR /app

RUN apt update
RUN apt install -y wget gcc fuse

ENV PYTHONUNBUFFERED=1
RUN apt install -y python3 python3-pip
RUN python3 -m pip install --no-cache --upgrade pip setuptools

RUN python3 -m pip install --no-cache catboost==1.2
RUN python3 -m pip install --no-cache scikit-learn==1.3.1 numpy==1.25.2 pandas openpyxl matplotlib statsmodels tqdm requests beautifulsoup4

RUN wget https://github.com/yandex-cloud/geesefs/releases/latest/download/geesefs-linux-amd64 && chmod a+x geesefs-linux-amd64
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
