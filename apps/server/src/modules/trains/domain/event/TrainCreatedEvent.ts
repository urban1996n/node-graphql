import {DomainEvent} from "apps/server/src/modules/shared/domain/eventSourcing/Event/DomainEvent";
import {DomainIdentifierInterface} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierInterface";

export class TrainCreatedEvent extends DomainEvent
{
    constructor(
        private readonly trainUUid: DomainIdentifierInterface,
    ) {
        super();
    }
}
