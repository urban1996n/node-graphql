import {Route} from "apps/server/src/modules/trains/domain/model/Route";
import {Coordinates} from "apps/server/src/modules/trains/domain/valueObjects/Coordinates";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/valueObjects/DomainIdentifierGeneratorInterface";

export class RouteFactory
{
    constructor(private readonly domainIdGenerator: DomainIdentifierGeneratorInterface) {
        console.error('dupa');
        console.log('test')
    }

    public createRoute(name: string, latitude: number, longitude: number): Route {
        const coordinates = new Coordinates(latitude, longitude);

        return new Route(this.domainIdGenerator.generate(), coordinates, name);
    }
}
