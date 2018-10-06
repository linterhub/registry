import fs from 'fs';
import * as path from 'path';
import { RegistryType } from './registry.type';

export { RegistryType };

export type Source = {
    registry: RegistryType;
    repository?: string;
};

export type Arguments = {
    name?: string;
    version?: string;
};

export type RequestDefinition = {
    urlPrototype?: string;
    converter: (data: string | any, args: Arguments & Source) => any; 
};

export type Template = {
    name: RegistryType | string;
    urlPrototype: string;
    repositories: string[];
    requests: { [x in Request]: RequestDefinition };
};

const registryFolder: string = path.join(__dirname, '../registry');

export const registryCollection: { [x in RegistryType]:Template } & { list(): string[] } = fs
    .readdirSync(registryFolder)
    .map(x => path.basename(x))
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .map(x => require(path.join(registryFolder, x)))
    .reduce((map, obj) => {
        map[obj.name] = obj;
        return map;
    }, {});

registryCollection.list = () => Object
    .getOwnPropertyNames(registryCollection)
    .filter(x => x in RegistryType);

export enum Request {
    Meta = 'meta',
    Dependencies = 'deps',
    Versions = 'versions'
}
