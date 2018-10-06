import { Linter } from './interface/library';
import { RegistryType } from '../src/model/registry.type';

const data : Linter[] = [
    {
        name: 'eslint',
        version: '5.2.0',
        registry: RegistryType.npm,
        dependency: {
            source: {
                registry: RegistryType.npm,
                repository: 'registry.npmjs.org'
            },
            package: 'glob', 
            version: '^7.1.2'
        },
    },
    {
        name: 'flake8',
        version: '3.4.0',
        registry: RegistryType.pip,
        dependency: {
            source: {
                registry: RegistryType.pip,
                repository: 'pypi.org/pypi'
            },
            package: 'pyflakes'
        },
    },
    {
        name: 'squizlabs/php_codesniffer',
        version: '3.3.0',
        registry: RegistryType.composer,
        dependency: { 
            source: {
                registry: RegistryType.composer,
                repository: 'packagist.org'
            },
            package: 'php', 
            version: '>=5.4.0' 
        }
    },
    {
        name: 'flay',
        version: '2.2.0',
        registry: RegistryType.gem,
        dependency:  { 
            source: {
                registry: RegistryType.gem,
                repository: 'rubygems.org'
            },
            package: 'ruby_parser', 
            version: '~> 3.0' 
        }
    },
    {
        name: 'System.Linq',
        version: '4.1.0',
        registry: RegistryType.nuget,
        dependency: {
            source: {
                registry: RegistryType.nuget,
                repository: 'api.nuget.org/v3'
            },
            package: '.NETStandard1.6'
        }
    }
];

export default data;
