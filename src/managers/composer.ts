import { Manager } from '../interface/manager';
import { Dependency } from '../interface/deps';
import { Meta } from '../interface/meta';
const requestPromise: any = require('request-promise');

export default class extends Manager {

    protected host = 'packagist.org';

    protected async requestComposer(name: string, version?: string): Promise<any> {
        const packageUrl = `https://${this.host}/packages/${name}.json`;
        return JSON.parse(await requestPromise(packageUrl));
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const x = await this.requestComposer(name, version);
        const json =
            version ?
                x.package.versions[version] :
                Object.keys(x.package.versions)
                    .filter(y => y.includes('.'))
                    .map(y => x.package.versions[x])
                    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                    .shift();
        return {
            package: `${json.name}:${json.version}`,
            name: json.name,
            description: json.description,
            url: json.homepage,
            license: json.license ? json.license[0] : null,
            version: json.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestComposer(name, version);
        const dependencies: Dependency[] =
            Object.keys(json.require)
                .map(x => {
                    return {
                        manager: this.name,
                        package: x,
                        version: json.require[x]
                    };
                });

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const json = await this.requestComposer(name);
        return Object.keys(json.package.versions)
            .filter(x => x.includes('.'));
    }
}
