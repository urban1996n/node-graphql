import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";
import {Train as TrainModel} from "apps/server/src/__generated__/graphql";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";
import {EntityId} from "apps/server/src/modules/shared/domain/valueObjects/EntityId";
import {
    entityToGraphQLModel
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/entityToGraphQLModel";

export class TrainQueryResolver {
    constructor(private readonly trainRepository: TrainRepositoryInterface) {
    }

    public async getTrains(): Promise<TrainModel[]> {
        return await this.trainRepository.findAll().then(trains => trains.map(entityToGraphQLModel));
    }

    public async getTrain(id: string): Promise<TrainModel | null> {
        const train = await this.trainRepository.find(new EntityId(id));

        return train ? entityToGraphQLModel(train) : null;
    }
}
