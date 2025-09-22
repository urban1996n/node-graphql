import {DependencyContainer} from "tsyringe";
import {
    TrainMutationResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainMutationResolver";
import {CreateTrainHandler} from "apps/server/src/modules/trains/application/event/createTrain/CreateTrainHandler";
import {
    TrainQueryResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainQueryResolver";

const onRegister = async (container: DependencyContainer): Promise<void> => {
    setTimeout(() => {}, 1000);
    container.register<TrainMutationResolver>(TrainMutationResolver, {
        useFactory: (container) => {
            return new TrainMutationResolver(container.resolve<CreateTrainHandler>(CreateTrainHandler));
        }
    });

    container.register<TrainQueryResolver>(TrainQueryResolver, {
        useFactory: (container) => {
            return new TrainQueryResolver(container.resolve("TrainRepositoryInterface"));
        }
    });
}

const onBoot = async (container: DependencyContainer): Promise<void> => {
}

export {
    onRegister,
    onBoot
}
