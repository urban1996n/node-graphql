import {LoaderInterface} from 'src/infrastructure/Http/httpServer/kernel/LoaderInterface';
import {DependencyContainer} from "tsyringe";

export interface KernelInterface {
    addLoader(loader: LoaderInterface): void;

    setup(container: DependencyContainer): void;

    register(): Promise<void>;

    boot(): Promise<void>;
}
