import { Dependency, Meta } from '../../src/index';
import { RegistryType } from '../../src/model/registry.type';

export type Linter = Meta & {
    registry: RegistryType
    dependency?: Dependency;
}
