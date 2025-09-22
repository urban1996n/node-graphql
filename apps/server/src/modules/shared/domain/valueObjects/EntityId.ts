import {DomainIdentifierInterface} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierInterface";

/**
 * Value object representing a UUID entity identifier.
 */
export class EntityId implements DomainIdentifierInterface
{
    public constructor(private readonly id: string) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.exec(id) === null) {
            throw new Error(`Invalid UUID: ${id}`);
        }
    }

    public toString(): string
    {
        return this.id;
    }
}
