import express, {Express} from "express";
import {Environment} from 'src/infrastructure/Http/httpServer/server/Environment';
import {HttpServerInterface} from "src/infrastructure/Http/httpServer/server/HttpServerInterface";
import {KernelInterface} from "src/infrastructure/Http/httpServer/kernel/KernelInterface";
import cors from "cors";

export class ExpressServer implements HttpServerInterface
{
    private kernel?: KernelInterface;

    constructor(
        private readonly engine: Express,
        private readonly env: Environment,
        private readonly port: number,
        private readonly host?: string
    ) {
        if (this.env === Environment.DEV) {
            this.engine.use(cors());
        }

        this.engine.use(express.json());
        this.engine.use(express.urlencoded({ extended: true }));

        process.on('SIGINT', async () => {
            console.log('Shutting down server...');
            // Here you can add any cleanup logic if needed
            process.exit(0);
        });
    }

    async start(beforeStart?: () => void): Promise<void> {
        if (this.kernel) {
            await this.kernel.register();
            await this.kernel.boot();
        }

        const args: any[] = [this.port];

        if (this.host) {
            args.push(this.host);
        }

        beforeStart?.();
        await this.engine.listen(...args);

        if (this.env === Environment.DEV) {
            console.log(`Server running at http://${this.host ?? 'localhost'}:${this.port}`);
        }
    }

    async close(): Promise<void> {
        process.emit('SIGINT');
    }

    setKernel(kernel: KernelInterface) {
        this.kernel = kernel;
    }
}
