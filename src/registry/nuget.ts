import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';

function getVersionData(json: any, version?: string) : any {
    const actualVersion = version ? version : json.items[0].upper;
    return json.items[0].items.filter((item : any) => item.catalogEntry.version === actualVersion).shift();
}

export = {
    name: RegistryType.nuget,
    repositories: [
        'api.nuget.org/v3'
    ],
    urlPrototype: 'https://{{{repository}}}/registration3/{{#lower}}{{{name}}}{{/lower}}/index.json',
    requests: {
        meta: {
            converter: (json: any, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);
        
                return {
                    name: data.catalogEntry.title,
                    description: data.catalogEntry.description,
                    url: data.catalogEntry.projectUrl,
                    license: data.catalogEntry.licenseUrl ? data.catalogEntry.licenseUrl : null,
                    version: data.catalogEntry.version,
                };
            }
        },
        deps: {
            converter: (json: any, args: Arguments & Source) => {
                const data = getVersionData(json, args.version);
                const dependencies: Dependency[] = [];

                if (data.catalogEntry.dependencyGroups) {
                    data.catalogEntry.dependencyGroups.map((dependencie : any) => {
                        dependencies.push({
                            source: {
                                registry: args.registry,
                                repository: args.repository
                            },
                            package: dependencie.targetFramework,
                        });
                    });
                }

                return dependencies;
            }
        },
        versions: {
            converter: (json: any) => json.items[0].items.map((item : any) => item.catalogEntry.version)
        }
    }
} as Template;