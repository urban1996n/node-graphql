import {Loader} from "apps/server/src/modules/trains/infrastructure/kernel/Loader";
import {DependencyContainer, container} from "tsyringe";

export class Kernel {
    private container?: DependencyContainer;
    private loaders: Loader[] = [];

    public setup(container: DependencyContainer): void
    {
        this.container = container;
    }

    public addLoader(loader: Loader)
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
