import { defineConfig } from 'vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { imagetools } from 'vite-imagetools'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: './src/app/routes',
      generatedRouteTree: './src/app/providers/routeTree.gen.ts',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
      target: 'react',
      autoCodeSplitting: true
    }),
    imagetools(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-jsx'],
      }, 
    }),
    react(),
    tsconfigPaths(),
    basicSsl()
  ],

  build: {
    cssMinify: 'lightningcss',
  },

  optimizeDeps: {
    // взято из официального экземпла на вит
    //workaround for the problem https://github.com/vitejs/vite/issues/7719
    extensions: ['.css'],
    esbuildOptions: {
        plugins: [
            (await import('esbuild-sass-plugin')).sassPlugin({
                type: 'style',
                silenceDeprecations: [
                  'import'
                ]
            }),
        ],
    },
  },

  server: {
    host: true,
  },
})
