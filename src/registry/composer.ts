import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';

function getVersionData(json: any, version?: string): any {
    return version ?
        json.package.versions[version] :
            Object.keys(json.package.versions)
                .filter(y => y.includes('.'))
                .map(y => json.package.versions[y])
                .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
                .shift();
}

export = {
    name: RegistryType.composer,
    repositories: [
        'packagist.org'
    ],
    urlPrototype: 'https://{{{repository}}}/packages/{{{name}}}.json',
    requests: {
        meta: {
            converter: (json: string, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);
                return {
                    name: data.name,
                    description: data.description,
                    url: data.homepage ? data.homepage : data.repository,
                    license: data.license ? data.license[0] : null,
                    version: data.version,
                };
            }
        },
        deps: {
            converter: (json: any, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);

                const dependencies: Dependency[] =
                    Object.keys(data.require)
                        .map(x => ({
                            source: {
                                registry: args.registry,
                                repository: args.repository
                            },
                            package: x,
                            version: data.require[x]
                        }));

                return dependencies;
            }
        },
        versions: {
            converter: (json: any) => {
                return Object.keys(json.package.versions)
                    .filter(x => x.includes('.'));
            }
        }
    }
} as Template;