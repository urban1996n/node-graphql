import {DependencyContainer} from "tsyringe";

export interface Loader
{
    onRegister(container: DependencyContainer): Promise<void>;
    onBoot(container: DependencyContainer): Promise<void>;
}
