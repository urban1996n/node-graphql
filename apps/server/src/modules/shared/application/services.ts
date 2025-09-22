import {DependencyContainer} from "tsyringe";
import {
    DomainIdentifierGeneratorInterface
} from "apps/server/src/modules/shared/domain/valueObjects/DomainIdentifierGeneratorInterface";
import {EntityIdGenerator} from "apps/server/src/modules/shared/domain/valueObjects/EntityIdGenerator";

const onRegister = async (container: DependencyContainer): Promise<void> => {
    container.register<DomainIdentifierGeneratorInterface>("DomainIdentifierGeneratorInterface", {useClass: EntityIdGenerator});
};

const onBoot = async (container: DependencyContainer): Promise<void> => {

}

export {
    onRegister,
    onBoot
}
