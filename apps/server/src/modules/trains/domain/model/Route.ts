import {Coordinates} from "apps/server/src/modules/trains/domain/valueObjects/Coordinates";
import {DomainIdentifierInterface} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierInterface";

export class Route {
    public constructor(
        public id: DomainIdentifierInterface,
        public readonly coordinates: Coordinates,
        public readonly name: string
    ) {
    }
}
