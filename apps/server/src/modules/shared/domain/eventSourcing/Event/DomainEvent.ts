import {DomainEventInterface} from "apps/server/src/modules/shared/domain/eventSourcing/Event/DomainEventInterface";
import {EventAlreadyEmittedError} from "apps/server/src/modules/shared/domain/eventSourcing/Event/EventAlreadyEmittedError";

export abstract class DomainEvent implements DomainEventInterface
{
    private emittedAt: Date | null = null;

    markEmitted() {
        if (this.emittedAt) {
            throw new EventAlreadyEmittedError(this);
        }

        this.emittedAt = new Date();
    }

    getEmittedAt(): Date | null {
        return this.emittedAt;
    }

    getName(): string {
        return 'CreateTrainEvent';
    }
}
