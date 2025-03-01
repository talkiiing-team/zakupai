/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './../routes/__root'
import { Route as TestImport } from './../routes/test'
import { Route as IndexImport } from './../routes/index'
import { Route as NotificationChannelsIndexImport } from './../routes/notification-channels/index'
import { Route as DashboardsIndexImport } from './../routes/dashboards/index'
import { Route as DashboardsMainImport } from './../routes/dashboards/main'
import { Route as DashboardsBuilderImport } from './../routes/dashboards/builder'
import { Route as DashboardsIdImport } from './../routes/dashboards/$id'

// Create/Update Routes

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NotificationChannelsIndexRoute = NotificationChannelsIndexImport.update({
  id: '/notification-channels/',
  path: '/notification-channels/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardsIndexRoute = DashboardsIndexImport.update({
  id: '/dashboards/',
  path: '/dashboards/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardsMainRoute = DashboardsMainImport.update({
  id: '/dashboards/main',
  path: '/dashboards/main',
  getParentRoute: () => rootRoute,
} as any)

const DashboardsBuilderRoute = DashboardsBuilderImport.update({
  id: '/dashboards/builder',
  path: '/dashboards/builder',
  getParentRoute: () => rootRoute,
} as any)

const DashboardsIdRoute = DashboardsIdImport.update({
  id: '/dashboards/$id',
  path: '/dashboards/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/dashboards/$id': {
      id: '/dashboards/$id'
      path: '/dashboards/$id'
      fullPath: '/dashboards/$id'
      preLoaderRoute: typeof DashboardsIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboards/builder': {
      id: '/dashboards/builder'
      path: '/dashboards/builder'
      fullPath: '/dashboards/builder'
      preLoaderRoute: typeof DashboardsBuilderImport
      parentRoute: typeof rootRoute
    }
    '/dashboards/main': {
      id: '/dashboards/main'
      path: '/dashboards/main'
      fullPath: '/dashboards/main'
      preLoaderRoute: typeof DashboardsMainImport
      parentRoute: typeof rootRoute
    }
    '/dashboards/': {
      id: '/dashboards/'
      path: '/dashboards'
      fullPath: '/dashboards'
      preLoaderRoute: typeof DashboardsIndexImport
      parentRoute: typeof rootRoute
    }
    '/notification-channels/': {
      id: '/notification-channels/'
      path: '/notification-channels'
      fullPath: '/notification-channels'
      preLoaderRoute: typeof NotificationChannelsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/test': typeof TestRoute
  '/dashboards/$id': typeof DashboardsIdRoute
  '/dashboards/builder': typeof DashboardsBuilderRoute
  '/dashboards/main': typeof DashboardsMainRoute
  '/dashboards': typeof DashboardsIndexRoute
  '/notification-channels': typeof NotificationChannelsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/test': typeof TestRoute
  '/dashboards/$id': typeof DashboardsIdRoute
  '/dashboards/builder': typeof DashboardsBuilderRoute
  '/dashboards/main': typeof DashboardsMainRoute
  '/dashboards': typeof DashboardsIndexRoute
  '/notification-channels': typeof NotificationChannelsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/test': typeof TestRoute
  '/dashboards/$id': typeof DashboardsIdRoute
  '/dashboards/builder': typeof DashboardsBuilderRoute
  '/dashboards/main': typeof DashboardsMainRoute
  '/dashboards/': typeof DashboardsIndexRoute
  '/notification-channels/': typeof NotificationChannelsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/test'
    | '/dashboards/$id'
    | '/dashboards/builder'
    | '/dashboards/main'
    | '/dashboards'
    | '/notification-channels'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/test'
    | '/dashboards/$id'
    | '/dashboards/builder'
    | '/dashboards/main'
    | '/dashboards'
    | '/notification-channels'
  id:
    | '__root__'
    | '/'
    | '/test'
    | '/dashboards/$id'
    | '/dashboards/builder'
    | '/dashboards/main'
    | '/dashboards/'
    | '/notification-channels/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TestRoute: typeof TestRoute
  DashboardsIdRoute: typeof DashboardsIdRoute
  DashboardsBuilderRoute: typeof DashboardsBuilderRoute
  DashboardsMainRoute: typeof DashboardsMainRoute
  DashboardsIndexRoute: typeof DashboardsIndexRoute
  NotificationChannelsIndexRoute: typeof NotificationChannelsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TestRoute: TestRoute,
  DashboardsIdRoute: DashboardsIdRoute,
  DashboardsBuilderRoute: DashboardsBuilderRoute,
  DashboardsMainRoute: DashboardsMainRoute,
  DashboardsIndexRoute: DashboardsIndexRoute,
  NotificationChannelsIndexRoute: NotificationChannelsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/test",
        "/dashboards/$id",
        "/dashboards/builder",
        "/dashboards/main",
        "/dashboards/",
        "/notification-channels/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/test": {
      "filePath": "test.tsx"
    },
    "/dashboards/$id": {
      "filePath": "dashboards/$id.tsx"
    },
    "/dashboards/builder": {
      "filePath": "dashboards/builder.tsx"
    },
    "/dashboards/main": {
      "filePath": "dashboards/main.tsx"
    },
    "/dashboards/": {
      "filePath": "dashboards/index.tsx"
    },
    "/notification-channels/": {
      "filePath": "notification-channels/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
