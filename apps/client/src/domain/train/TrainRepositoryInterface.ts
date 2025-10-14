import {Train} from "./Train"

export interface TrainRepositoryInterface {
    findOne(id: string): Promise<Train | undefined>;
    findAll(): Promise<Train[]>;
}
