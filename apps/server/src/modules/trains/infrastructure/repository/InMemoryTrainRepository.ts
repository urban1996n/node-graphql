import {TrainRepositoryInterface} from "apps/server/src/modules/trains/domain/repository/TrainRepositoryInterface";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";
import {EntityId} from "apps/server/src/modules/shared/domain/valueObjects/EntityId";
import crypto from "crypto";

const train1 = new Train(
    new EntityId(crypto.randomUUID()),
    'Train 1',
);

const train2 = new Train(
    new EntityId(crypto.randomUUID()),
    'Train 2',
);

const InMemoryDatabase = {
    trains: new Map<string, Train>()
}

InMemoryDatabase.trains.set(train1.id.toString(), train1);
InMemoryDatabase.trains.set(train2.id.toString(), train2);

export class InMemoryTrainRepository implements TrainRepositoryInterface {
    async find(id: EntityId): Promise<Train | null> {
        return InMemoryDatabase.trains.get(id.toString()) || null;
    }

    async findAll(): Promise<Train[]> {
        return Array.from(InMemoryDatabase.trains.values());
    }

    async save(train: Train): Promise<boolean> {
        InMemoryDatabase.trains.set(train.id.toString(), train);

        return true;
    }
}
