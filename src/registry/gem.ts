import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';

export = {
    name: RegistryType.gem,
    repositories: [
        'rubygems.org'
    ],
    urlPrototype: 
        'https://{{{repository}}}/api/{{#version}}v2/rubygems/{{{name}}}/versions/{{{version}}}{{/version}}{{^version}}v1/gems/{{{name}}}{{/version}}.json',
    requests: {
        meta: {
            converter: (json: any, args: Arguments & Source) => {
                return {
                    name: json.name,
                    description: json.description,
                    url: json.homepage_uri,
                    license: json.licenses ? json.licenses[0] : null,
                    version: json.version,
                };
            }
        },
        deps: {
            converter: (json: any, args: Arguments & Source) => {
                const dependencies: Dependency[] = [];

                for (const key in json.dependencies.runtime) {
                    if (json.dependencies.runtime.hasOwnProperty(key)) {
                        dependencies.push({
                            source: {
                                registry: args.registry,
                                repository: args.repository
                            },
                            package: json.dependencies.runtime[key].name,
                            version: json.dependencies.runtime[key].requirements
                        });
                    }
                }

                return dependencies;
            }
        },
        versions: {
            urlPrototype: 'https://{{{repository}}}/api/v1/versions/{{{name}}}.json',
            converter: (json: any[]) => json.map(x => x.number)
        }
    }
} as Template;
