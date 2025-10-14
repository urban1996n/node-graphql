import {DomainEventInterface} from "apps/server/src/modules/shared/domain/eventSourcing/Event/DomainEventInterface";
import {
    EventListenerInterface
} from "apps/server/src/modules/shared/domain/eventSourcing/Subscriber/EventListenerInterface";

export interface DomainEventEmitterInterface {
    emit(event: DomainEventInterface): Promise<void>;
    addListener(listener: EventListenerInterface): void;
}
