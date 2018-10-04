import { Source } from './registry';

// Describes meta information of package
export type Meta = {
    name: string;
    description?: string;
    url?: string;
    license?: string;
    version: string;
};

// Describes single dependency in package manager
export type Dependency = {
    source: Source;
    package: string;
    version?: string;
    target?: boolean;
}

export type Data = {
    data: any;
} & Source;