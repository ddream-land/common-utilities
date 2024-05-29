import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
// import preserveDirectives from 'rollup-plugin-preserve-directives'

// https://vitejs.dev/config/
export default defineConfig(function ({ mode, command }) {
  return {
    plugins: [react(), dts()],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      lib: {
        name: '@ddreamland/common',
        fileName: 'ddreamland-common',
        entry: resolve(__dirname, 'src/index.ts'),
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', 'tailwindcss'],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
          banner: `'use client';`,
        },
      },
      sourcemap: false,
    },
  }
})
