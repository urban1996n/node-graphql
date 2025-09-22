import {Train} from "apps/server/src/modules/trains/domain/model/Train";

export interface TrainFactoryInterface
{
    create(trainName: string): Promise<Train>;
}
