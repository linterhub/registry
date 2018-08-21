import { managerType } from './../../src/index';
import Dependency from '../../src/interface/deps';

export default interface Library {
    name: string;
    manager: managerType;
    version?: string;
    dependency?: Dependency;
}
