import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierGeneratorInterface";
import {TrainFactoryInterface} from "apps/server/src/modules/trains/domain/factory/TrainFactoryInterface";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";
import {TrainId} from "apps/server/src/modules/trains/domain/valueObjects/TrainId";

export class TrainFactory implements TrainFactoryInterface
{
    constructor(private readonly uuidGenerator: DomainIdentifierGeneratorInterface) {
    }

    async create(trainName: string): Promise<Train> {
        return new Train(TrainId.from(this.uuidGenerator.generate().toString()), trainName);
    }
}
