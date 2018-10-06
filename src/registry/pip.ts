import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';

export = {
    name: RegistryType.pip,
    repositories: [
        'pypi.org/pypi'
    ],
    urlPrototype: 'https://{{{repository}}}/{{{name}}}{{#version}}/{{{version}}}{{/version}}/json',
    requests: {
        meta: {
            converter: (json: any, args: Arguments & Source) => {
                return {
                    name: json.info.name,
                    description: json.info.summary,
                    url: json.info.home_page,
                    license: json.info.license ? json.info.license : null,
                    version: json.info.version,
                };
            }
        },
        deps: {
            converter: (json: any, args: Arguments & Source) => {
                const dependencies: Dependency[] = [];
                if (json.info.requires_dist) {
                    for (const index in json.info.requires_dist) {
                        let parsed = json.info.requires_dist[index].match(/([^\s]+)\s\((.+)\).*/);
                        if (parsed ? parsed.length > 1 : false) {
                            dependencies.push({
                                source: {
                                    registry: args.registry,
                                    repository: args.repository
                                },
                                package: parsed[1],
                                version: parsed[2]
                            });
                        } else {
                            parsed = json.info.requires_dist[index].match(/([a-z0-9]+).*/);
                            if (parsed ? parsed.length > 1 : false) {
                                dependencies.push({
                                    source: {
                                        registry: args.registry,
                                        repository: args.repository
                                    },
                                    package: parsed[1]
                                });
                            }
                        }
                    }
                }
                return dependencies;
            }
        },
        versions: {
            urlPrototype: 'https://{{{repository}}}/{{{name}}}/json',
            converter: (json: any) => {
                return Object
                    .keys(json.releases)
                    .filter(x => x && json.releases[x].length > 0);
            }
        }
    }
} as Template;