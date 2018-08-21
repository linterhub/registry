import Dependency from '../interface/deps';
import Manager from '../interface/manager';
import Request from 'request-promise';
import Meta from '../interface/meta';

export default class extends Manager {

    protected host = 'rubygems.org';

    protected generateUrlApiV1(method: string, gem: string){
        return `https://${this.host}/api/v1/${method}/${gem}.json`;
    }

    protected generateUrlApiV2(method: string, gem: string, version: string) {
        return `https://${this.host}/api/v2/${method}/${gem}/versions/${version}.json`;
    }

    protected async requestGEM(name: string, version?: string): Promise<any> {
        const data = await Request(
            version ? this.generateUrlApiV2('rubygems', name, (version as string)) :
                this.generateUrlApiV1('gems', name));
        return JSON.parse(data);
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host ? host : this.host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestGEM(name, version);
        return {
            name: json.name,
            description: json.info,
            url: json.homepage_uri,
            license: json.licenses ? json.licenses[0] : null,
            version: json.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestGEM(name, version);
        const dependencies: Dependency[] = [];

        for (const key in json.dependencies.runtime) {
            if (json.dependencies.runtime.hasOwnProperty(key)) {
                dependencies.push({
                    manager: this.name,
                    package: json.dependencies.runtime[key].name,
                    version: json.dependencies.runtime[key].requirements
                });
            }
        }

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const data = await Request(this.generateUrlApiV1('versions', name));
        return JSON.parse(data).map((version : any) => {
            return version.number;
        });
    }
}
