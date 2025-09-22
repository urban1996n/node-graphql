import {EntityId} from "apps/server/src/modules/shared/domain/valueObjects/EntityId";

export class TrainId extends EntityId
{
    static from(id: string): TrainId {
        return new TrainId(id);
    }
}
