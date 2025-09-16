import {DomainIdentifierInterface} from "apps/server/src/modules/shared/valueObjects/DomainIdentifierInterface";

export interface DomainIdentifierGeneratorInterface
{
    generate(): DomainIdentifierInterface;
}
