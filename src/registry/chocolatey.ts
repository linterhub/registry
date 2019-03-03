import { Dependency } from '../model/data';
import { Template, Arguments, Source, RegistryType } from '../model/registry';
import convert from 'xml-js';

function mapData(data: string): { version: string, data: any }[] | undefined {
    const result = convert.xml2json(data, { compact: true, spaces: 4 });
    const entries = JSON.parse(result).feed.entry;
    if (entries) {
        return entries.map((x: any) => ({ version: x['m:properties']["d:Version"]._text, data: x}));
    }
    return undefined;
}

export = {
    name: RegistryType.chocolatey,
    repositories: [
        'chocolatey.org'
    ],
    urlPrototype: 'https://{{{repository}}}/api/v2/FindPackagesById?id=\'{{{name}}}\'',
    requests: {
        meta: {
            converter: (data: string, args: Arguments & Source) => {
                const mapped = mapData(data);
                if (mapped) {
                    const json = mapped.filter(x => args.version ? x.version.includes(args.version) : true).reverse()[0];
                    return {
                        name: json.data.title._text,
                        description: json.data.summary._text,
                        url: json.data['m:properties']["d:ProjectUrl"]._text,
                        licenseUrl: json.data['m:properties']['d:LicenseUrl']._text,
                        version: json.version,
                    };
                }
                return undefined;
            }
        },
        deps: {
            converter: (data: any, args: Arguments & Source) => {
                const mapped = mapData(data);
                if (mapped) {
                    const json = mapped.filter(x => args.version ? x.version.includes(args.version) : true).reverse()[0];
                    const dependencies: Dependency[] = json.data['m:properties']["d:Dependencies"]._text
                        .split('|')
                        .map((x: any) => {
                            const parsedDependency = x.split(':')
                            if(parsedDependency.length < 2){
                                return null
                            }
                            return {
                                source: {
                                    registry: args.registry,
                                    repository: args.repository
                                },
                                package: parsedDependency[0],
                                version: parsedDependency[1]
                            }
                        })
                        .filter((x: Dependency | null) => x);

                    return dependencies;
                }
                return undefined;
            }
        },
        versions: {
            converter: (data: any) => {
                const mapped = mapData(data);
                if (mapped) {
                    return mapped.map(x => x.version);
                }
                return undefined;
            }
        }
    }
} as Template;