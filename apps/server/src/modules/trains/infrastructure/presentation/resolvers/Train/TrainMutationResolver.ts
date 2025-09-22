import {CreateTrainHandler} from "apps/server/src/modules/trains/application/event/createTrain/CreateTrainHandler";
import {Train} from "apps/server/src/__generated__/graphql";
import {
    entityToGraphQLModel
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/entityToGraphQLModel";

export class TrainMutationResolver {
    constructor(private createTrainHandler: CreateTrainHandler) {
    }

    public async createTrain(name: string): Promise<Train> {
        const command = {trainName: name};
        const train = await this.createTrainHandler.handle(command);

        return entityToGraphQLModel(train);
    }
}
