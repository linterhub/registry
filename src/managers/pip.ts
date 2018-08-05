import { Manager } from '../interface/manager';
import { Dependency } from '../interface/deps';
import { Meta } from '../interface/meta';
const requestPromise = require('request-promise');

export default class extends Manager {

    protected host = 'pypi.org/pypi';

    private async requestPIP(name: string, version?: string): Promise<any> {
        if (version) {
            name += `/${version}`;
        }
        const packageUrl = `https://${this.host}/${name}/json`;
        return JSON.parse(await requestPromise(packageUrl));
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestPIP(name, version);
        return {
            package: `${json.name}:${json.version}`,
            name: json.name,
            description: json.info.summary,
            url: json.info.home_page,
            license: json.info.license,
            version: json.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestPIP(name, version);
        const dependencies: Dependency[] = [];

        if (json.info.requires_dist) {
            for (const index in json.info.requires_dist) {
                let parsed = json.info.requires_dist[index].match(/([^\s]+)\s\((.+)\).*/);
                if (parsed ? parsed.length > 1 : false) {
                    dependencies.push({
                        manager: this.name,
                        package: parsed[1],
                        version: parsed[2]
                    });
                } else {
                    parsed = json.info.requires_dist[index].match(/([a-z0-9]+).*/);
                    if (parsed ? parsed.length > 1 : false) {
                        dependencies.push({
                            manager: this.name,
                            package: parsed[1]
                        });
                    }
                }
            }
        }

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const json = await this.requestPIP(name);
        return Object
            .keys(json.releases)
            .filter(x => x && json.releases[x].length > 0);
    }
}
