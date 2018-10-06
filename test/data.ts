import { Linter } from './interface/library';

const data : Linter[] = [
    {
        name: "eslint",
        version: "5.2.0",
        registry: "npm",
        dependency: {
            source: {
                registry: "npm",
                repository: "registry.npmjs.org"
            },
            package: 'glob', 
            version: '^7.1.2'
        },
    },
    {
        name: 'flake8',
        version: '3.4.0',
        registry: "pip",
        dependency: {
            source: {
                registry: "pip",
                repository: "pypi.org/pypi"
            },
            package: "pyflakes"
        },
    },
    {
        name: 'squizlabs/php_codesniffer',
        version: '3.3.0',
        registry: "composer",
        dependency: { 
            source: {
                registry: "composer",
                repository: "packagist.org"
            },
            package: "php", 
            version: '>=5.4.0' 
        }
    },
    {
        name: 'flay',
        version: '2.2.0',
        registry: "gem",
        dependency:  { 
            source: {
                registry: "gem",
                repository: "rubygems.org"
            },
            package: "ruby_parser", 
            version: '~> 3.0' 
        }
    }
];

export default data;
