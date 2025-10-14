import {
    DomainEventEmitterInterface
} from "apps/server/src/modules/shared/domain/eventSourcing/Emitter/DomainEventEmitterInterface";
import {
    EventListenerInterface
} from "apps/server/src/modules/shared/domain/eventSourcing/Subscriber/EventListenerInterface";
import {DomainEventInterface} from "apps/server/src/modules/shared/domain/eventSourcing/Event/DomainEventInterface";

export class MemoryEventEmitter implements DomainEventEmitterInterface
{
    private listeners: EventListenerInterface[] = [];

    addListener(listener: EventListenerInterface) {
        for (const event of listener.getSubscribedEvents()) {
            const callback = listener[event.methodName];

            if (typeof callback !== 'function') {
                throw new Error(`Method ${event.methodName} does not exist on listener.`);
            }
        }

        this.listeners.push(listener);
    }

    async emit(event: DomainEventInterface): Promise<void> {
        event.markEmitted();

        for (const listener of this.listeners) {
            for (const subscribedEvent of listener.getSubscribedEvents()) {
                if (subscribedEvent.eventName === event.getName()) {
                    const callback = listener[subscribedEvent.methodName];

                    await callback.bind(listener).call(event);
                }
            }
        }
    }
}
