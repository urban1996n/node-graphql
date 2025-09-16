import {EntityId} from "apps/server/src/modules/shared/valueObjects/EntityId";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/valueObjects/DomainIdentifierGeneratorInterface";
import crypto from "crypto";

export class EntityIdGenerator implements DomainIdentifierGeneratorInterface
{
    public generate(): EntityId {
        return new EntityId(
            crypto.randomUUID()
        );
    }
}
