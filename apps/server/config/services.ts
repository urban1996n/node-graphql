import {container} from "tsyringe";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/valueObjects/DomainIdentifierGeneratorInterface";
import {EntityIdGenerator} from "apps/server/src/modules/shared/valueObjects/EntityIdGenerator";
import {RouteFactory} from "apps/server/src/modules/trains/domain/factory/RouteFactory";
import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";
import {
    InMemoryTrainRepository
} from "apps/server/src/modules/trains/infrastructure/repository/InMemoryTrainRepository";
import {
    GetTrainsResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/GetTrainsResolver";

interface SetupServicesParams {
    container: typeof container
}

export const setupServices = async ({container}: SetupServicesParams) => {
    container.register<DomainIdentifierGeneratorInterface>("DomainIdentifierGeneratorInterface", {useClass: EntityIdGenerator});
    container.register<RouteFactory>(RouteFactory, {
        useFactory: (container) => {
            return new RouteFactory(container.resolve<DomainIdentifierGeneratorInterface>("DomainIdentifierGeneratorInterface"))
        }
    });
    container.register<TrainRepositoryInterface>("TrainRepositoryInterface", {useClass: InMemoryTrainRepository});
    container.register(
        GetTrainsResolver,
        {
            useFactory: (container) => {
                return new GetTrainsResolver(container.resolve<TrainRepositoryInterface>("TrainRepositoryInterface"))
            }
        }
    );
};
