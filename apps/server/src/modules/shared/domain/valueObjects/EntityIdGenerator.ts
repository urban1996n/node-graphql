import {EntityId} from "apps/server/src/modules/shared/domain/valueObjects/EntityId";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierGeneratorInterface";
import crypto from "crypto";

export class EntityIdGenerator implements DomainIdentifierGeneratorInterface
{
    public generate(): EntityId {
        return new EntityId(
            crypto.randomUUID()
        );
    }
}
