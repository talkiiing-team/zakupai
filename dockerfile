FROM node:22-alpine AS base
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
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache python3 py3-pip py3-scikit-learn py3-numpy py3-pandas py3-openpyxl py3-matplotlib py3-statsmodels py3-tqdm wget fuse curl gcc
RUN curl -proto '=https' -tlsv1.2 -sSf https://sh.rustup.rs | sh
RUN source $HOME/.cargo/env
RUN ln -sf python3 /usr/bin/python
RUN python3 -m pip install --no-cache --upgrade pip setuptools --break-system-packages
RUN python3 -m pip install --no-cache catboost --break-system-packages
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
