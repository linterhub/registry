import { Manager } from '../interface/manager';
import { Dependency } from '../interface/deps';
import { Meta } from '../interface/meta';
import packageJson from 'package-json';

export default class extends Manager {

    // TODO: Create filters to parse only necessary data
    private requestNPM(name: string, version?: string): Promise<any> {
        return packageJson(name, { version: version ? version : 'latest', fullMetadata: true, allVersions: true });
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        let json = await this.requestNPM(name, version);
        version = version ? version : Object.keys(json.versions).pop();
        if (version) {
            json = json.versions[version];
        }
        return {
            package: `${json.name}:${json.version}`,
            name: json.name,
            description: json.description,
            url: json.homepage,
            license: json.license,
            version: json.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestNPM(name, version);
        const dependencies: Dependency[] = [];

        for (const key in json.dependencies) {
            if (json.dependencies.hasOwnProperty(key)) {
                dependencies.push({
                    manager: this.name,
                    package: key,
                    version: json.dependencies[key]
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
