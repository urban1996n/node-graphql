export interface DomainEventInterface {
    getName(): string;
    getEmittedAt(): Date | null;
    markEmitted(): void;
}
