import {DomainIdentifierInterface} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierInterface";

export interface DomainIdentifierGeneratorInterface
{
    generate(): DomainIdentifierInterface;
}
