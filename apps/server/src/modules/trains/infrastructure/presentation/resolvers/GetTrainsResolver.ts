import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";
import {Train as TrainModel} from "apps/server/src/__generated__/graphql";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";

const toGraphQLType = (train: Train): TrainModel => ({
    id: train.id.toString(),
    name: train.name,
});

export class GetTrainsResolver {
    constructor(private readonly trainRepository: TrainRepositoryInterface) {
    }

    public async getTrains(): Promise<TrainModel[]> {
        return await this.trainRepository.findAll().then(trains => trains.map(toGraphQLType));
    }
}
