import fs from 'fs';
import * as path from 'path';

export type Source = {
    registry: string;
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
    name: string;
    urlPrototype: string;
    repositories: string[];
    requests: { [key:string]:RequestDefinition };
};

const registryFolder: string = path.join(__dirname, '../registry');

export const registryList: { [key:string]:Template } = fs
    .readdirSync(registryFolder)
    .filter(x => path.extname(x) == '.js')
    .map(x => require(path.join(registryFolder, x)))
    .reduce(function(map, obj) {
        map[obj.name] = obj;
        return map;
    }, {});

export enum Request {
    Meta = "meta",
    Dependencies = "deps",
    Versions = "versions"
}
