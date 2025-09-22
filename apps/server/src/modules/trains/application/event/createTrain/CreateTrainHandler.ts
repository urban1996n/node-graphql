import {DomainEventEmitterInterface} from "apps/server/src/modules/shared/domain/eventSourcing/DomainEventEmitterInterface";
import {Command} from "apps/server/src/modules/trains/application/event/createTrain/Command";
import {TrainFactoryInterface} from "apps/server/src/modules/trains/domain/factory/TrainFactoryInterface";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";
import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";

export class CreateTrainHandler {
    constructor(
        private readonly trainFactory: TrainFactoryInterface,
        private readonly trainRepository: TrainRepositoryInterface
    ) {}

    async handle(command: Command): Promise<Train> {
        const {trainName} = command;

        const train = await this.trainFactory.create(trainName);
        await this.trainRepository.save(train);

        return train;
    }
}
