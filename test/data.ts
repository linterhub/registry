import Library from './interface/library';
import { managerType } from './../src/index';

const data : Library[] = [
    {
        name: "eslint",
        version: "5.2.0",
        manager: managerType.npm,
        dependency: {
            manager: managerType.npm, 
            package: 'glob', 
            version: '^7.1.2'
        },
    },
    {
        name: 'flake8',
        version: '3.4.0',
        manager: managerType.pip,
        dependency: {
            manager: managerType.pip, 
            package: "pyflakes"
        },
    },
    {
        name: 'squizlabs/php_codesniffer',
        version: '3.3.0',
        manager: managerType.composer,
        dependency: { 
            manager: managerType.composer, 
            package: "php", 
            version: '>=5.4.0' 
        }
    },
    {
        name: 'flay',
        version: '2.2.0',
        manager: managerType.gem,
        dependency:  { 
            manager: managerType.gem, 
            package: "ruby_parser", 
            version: '~> 3.0' 
        }
    }
];

export default data;
