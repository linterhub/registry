import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';

function getVersionData(json : any, version?: string) : any {
    version = version ? version : Object.keys(json.versions).pop();
    return version ? json.versions[version] : json;
}

export = {
    name: RegistryType.npm,
    repositories: [
        'registry.npmjs.org'
    ],
    urlPrototype: 'https://{{{repository}}}/{{{name}}}',
    requests: {
        meta: {
            converter: (json: any, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);
                return {
                    name: data.name,
                    description: data.description,
                    url: data.homepage,
                    license: data.license,
                    version: data.version,
                };
            }
        },
        deps: {
            converter: (json: any, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);
                const dependencies: Dependency[] = [];

                for (const key in data.dependencies) {
                    if (data.dependencies.hasOwnProperty(key)) {
                        dependencies.push({
                            source: {
                                registry: args.registry,
                                repository: args.repository
                            },
                            package: key,
                            version: data.dependencies[key]
                        });
                    }
                }

                return dependencies;
            }
        },
        versions: {
            converter: (json: any) => Object.keys(json.versions)
        }
    }
} as Template;
