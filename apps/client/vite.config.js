import {defineConfig} from "vite";
import {resolve} from 'path';

console.log(resolve(__dirname));

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            external:
            [
                resolve(__dirname)
            ]
        }
    }
});
