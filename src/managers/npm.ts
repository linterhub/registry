import Dependency from '../interface/deps';
import Manager from '../interface/manager';
import Meta from '../interface/meta';
import packageJson from 'package-json';
import fs = require('fs');

export default class extends Manager {

    protected getVersionData(json : any, version?: string) : any {
        version = version ? version : Object.keys(json.versions).pop();
        return version ? json.versions[version] : json;
    }

    // TODO: Create filters to parse only necessary data
    private requestNPM(name: string, version?: string): Promise<any> {
        return packageJson(name, { version: version ? version : 'latest', fullMetadata: true, allVersions: true });
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestNPM(name, version);
        const data = this.getVersionData(json, version);

        return {
            name: data.name,
            description: data.description,
            url: data.homepage,
            license: data.license,
            version: data.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestNPM(name, version);
        const data = this.getVersionData(json, version);
        const dependencies: Dependency[] = [];

        for (const key in data.dependencies) {
            if (data.dependencies.hasOwnProperty(key)) {
                dependencies.push({
                    manager: this.name,
                    package: key,
                    version: data.dependencies[key]
                });
            }
        }

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const json = await this.requestNPM(name,);
        return Object.keys(json.versions);
    }
}
