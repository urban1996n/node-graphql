import {DependencyContainer} from "tsyringe";
import {KernelInterface} from "src/infrastructure/Http/httpServer/kernel/KernelInterface";
import {LoaderInterface} from "src/infrastructure/Http/httpServer/kernel/LoaderInterface";

export class Kernel implements KernelInterface {
    private container?: DependencyContainer;
    private loaders: LoaderInterface[] = [];

    public setup(container: DependencyContainer): void
    {
        this.container = container;
    }

    public addLoader(loader: LoaderInterface)
    {
        this.loaders.push(loader);
    }

    async register(): Promise<void>
    {
        this.validate();

        for (let i = 0; i < this.loaders.length; i++) {
            await this.loaders[i].onRegister(this.container!);
        }
    }

    async boot(): Promise<void>
    {
        this.validate();

        for (let i = 0; i < this.loaders.length; i++) {
            await this.loaders[i].onRegister(this.container!);
        }
    }

    private validate(): void {
        if (!this.container) {
            throw new Error("Container not initialized. Call setup() before using the kernel.");
        }
    }
}
