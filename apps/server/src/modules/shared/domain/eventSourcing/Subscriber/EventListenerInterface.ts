type SubscribedEvent<T extends EventListenerInterface> = {
    eventName: string;
    methodName: keyof T;
}

export interface EventListenerInterface
{
    getSubscribedEvents(): SubscribedEvent<this>[];
}
