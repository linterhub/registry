import { Source, Arguments, Request } from './registry';

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
};

export type Data = {
    data?: any;
    error?: string;
    request: Arguments & Source & { 
        type: Request,
        timestamp: number
    };
};