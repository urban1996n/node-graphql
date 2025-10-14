import {defineConfig, Format} from 'tsup'

const env = process.env.NODE_ENV || 'development'

const format: Format = 'esm';
const commonConfig = {
    sourcemap: env === 'development',
    clean: true,
    dts: true,
    outDir: 'dist',
    format,
}

const clientConfig = {
    entry: ['src/client.ts'],
    target: 'es2016',
    ...commonConfig
};

const serverConfig = {
    entry: ['src/server.ts'],
    target: 'node18',
    ...commonConfig
}

export default defineConfig([clientConfig, serverConfig])
