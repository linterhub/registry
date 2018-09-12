import Dependency from './deps';
import Meta from './meta';
import format from 'string-format';

export type Source = {
    registry: string;
    repository: string;
};

export type Arguments = {
    name?: string;
    version?: string;
};

export type Definition = {
    urlProrotype: string;
    converter: <T>(json: string) => T; 
};

export type Template = {
    name: string;
    repositories: string[];
    requests: { [key:string]:Definition };
};
