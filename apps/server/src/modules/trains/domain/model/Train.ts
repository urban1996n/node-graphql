import {DomainIdentifierInterface} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierInterface";

export class Train
{
    constructor(public readonly id: DomainIdentifierInterface, public readonly name: string) {
    }

    public canRun(): boolean {
        return true;
    }
}
