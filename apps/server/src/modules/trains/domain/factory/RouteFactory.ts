import {Route} from "apps/server/src/modules/trains/domain/model/Route";
import {Coordinates} from "apps/server/src/modules/trains/domain/valueObjects/Coordinates";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierGeneratorInterface";

export class RouteFactory
{
    constructor(private readonly domainIdGenerator: DomainIdentifierGeneratorInterface) {
    }

    public createRoute(name: string, latitude: number, longitude: number): Route {
        const coordinates = new Coordinates(latitude, longitude);

        return new Route(this.domainIdGenerator.generate(), coordinates, name);
    }
}
