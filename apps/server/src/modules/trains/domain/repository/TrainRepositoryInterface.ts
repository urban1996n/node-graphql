import {EntityId} from "apps/server/src/modules/shared/valueObjects/EntityId";
import {Train} from "apps/server/src/modules/trains/domain/model/Train";
export interface TrainRepositoryInterface
{
    find(id: EntityId): Promise<Train | null>;
    findAll(): Promise<Train[]>;
    save(train: Train): Promise<boolean>;
}
