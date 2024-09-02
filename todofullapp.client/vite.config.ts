import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import plugin from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import { env } from 'process'

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`

const certificateName = 'todofullapp.client'
const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password'
      ],
      { stdio: 'inherit' }
    ).status
  ) {
    throw new Error('Could not create certificate.')
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'https://localhost:7018'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@models': path.resolve(__dirname, './src/models'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    proxy: {
      '^/auth': {
        target,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/api/auth')
      },
      '^/task': {
        target,
        secure: false,
        rewrite: (path) => path.replace(/^\/task/, '/api/task')
      }
    },
    port: 5173,

    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    }
  }
})
