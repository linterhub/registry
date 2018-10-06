import { Dependency, Meta } from '../../src/index';

export type Linter = Meta & {
    registry: string
    dependency?: Dependency;
}
