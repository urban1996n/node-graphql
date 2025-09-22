import {Train as Entity} from "apps/server/src/modules/trains/domain/model/Train";
import {Train} from "apps/server/src/__generated__/graphql";

export const entityToGraphQLModel = (train: Entity): Train => ({
    id: train.id.toString(),
    name: train.name,
})
