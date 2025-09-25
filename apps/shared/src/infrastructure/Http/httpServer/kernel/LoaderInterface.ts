import {DependencyContainer} from "tsyringe";

export interface LoaderInterface
{
    onRegister(container: DependencyContainer): Promise<void>;
    onBoot(container: DependencyContainer): Promise<void>;
}
