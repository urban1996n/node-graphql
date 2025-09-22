import {DependencyContainer} from "tsyringe";
import {RouteFactory} from "apps/server/src/modules/trains/domain/factory/RouteFactory";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierGeneratorInterface";
import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";
import {
    InMemoryTrainRepository
} from "apps/server/src/modules/trains/infrastructure/repository/InMemoryTrainRepository";
import {
    TrainQueryResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainQueryResolver";
import {
    TrainMutationResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainMutationResolver";
import {CreateTrainHandler} from "apps/server/src/modules/trains/application/event/createTrain/CreateTrainHandler";
import {TrainFactory} from "apps/server/src/modules/trains/domain/factory/TrainFactory";
import {TrainFactoryInterface} from "apps/server/src/modules/trains/domain/factory/TrainFactoryInterface";

const onRegister = async (container: DependencyContainer): Promise<void> => {
    container.register<RouteFactory>(RouteFactory, {
        useFactory: (container) => {
            return new RouteFactory(container.resolve<DomainIdentifierGeneratorInterface>("DomainIdentifierGeneratorInterface"))
        }
    });
    container.register<TrainRepositoryInterface>("TrainRepositoryInterface", {useClass: InMemoryTrainRepository});
    container.register(
        TrainQueryResolver,
        {
            useFactory: (container) => {
                return new TrainQueryResolver(container.resolve<TrainRepositoryInterface>("TrainRepositoryInterface"))
            }
        }
    );
    container.register<TrainFactoryInterface>("TrainFactoryInterface", {
        useFactory: (container) => {
            return new TrainFactory(container.resolve<DomainIdentifierGeneratorInterface>("DomainIdentifierGeneratorInterface"));
        }
    });

    container.register<CreateTrainHandler>(CreateTrainHandler, {
        useFactory: (container: DependencyContainer) => {
            return new CreateTrainHandler(
                container.resolve<TrainFactoryInterface>("TrainFactoryInterface"),
                container.resolve<TrainRepositoryInterface>("TrainRepositoryInterface")
            );
        }
    });
}

const onBoot = async (container: DependencyContainer): Promise<void> => {
}

export {
    onRegister,
    onBoot
}
