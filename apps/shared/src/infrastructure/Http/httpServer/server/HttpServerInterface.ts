import {KernelInterface} from "src/infrastructure/Http/httpServer/kernel/KernelInterface";

export interface HttpServerInterface
{
    start(beforeStart?: () => void): Promise<void>;
    close(): Promise<void>;
    setKernel(kernel: KernelInterface): void;
}
