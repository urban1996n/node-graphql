import {DomainEventInterface} from "apps/server/src/modules/shared/domain/eventSourcing/Event/DomainEventInterface";

export class EventAlreadyEmittedError extends Error
{
    constructor(event: DomainEventInterface) {
        super('Event already emitted' + event.getName());
        this.name = 'EventAlreadyEmittedError';
    }
}
