import Dependency from '../interface/deps';
import Manager from '../interface/manager';
import Request from 'request-promise';
import Meta from '../interface/meta';

export default class extends Manager {

    protected host = 'packagist.org';

    protected getVersionData(json : any, version?: string) : any {
        return version ?
            json.package.versions[version] :
                Object.keys(json.package.versions)
                    .filter(y => y.includes('.'))
                    .map(y => json.package.versions[y])
                    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
                    .shift();
    }
    protected async requestComposer(name: string, version?: string): Promise<any> {
        const packageUrl = `https://${this.host}/packages/${name}.json`;
        return JSON.parse(await Request(packageUrl));
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host ? host : this.host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestComposer(name, version);
        const data = this.getVersionData(json, version);

        return {
            name: data.name,
            description: data.description,
            url: data.homepage,
            license: data.license ? data.license[0] : null,
            version: data.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestComposer(name, version);
        const data = this.getVersionData(json, version);

        const dependencies: Dependency[] =
            Object.keys(data.require)
                .map(x => {
                    return {
                        manager: this.name,
                        package: x,
                        version: data.require[x]
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
