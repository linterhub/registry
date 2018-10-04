export type Source = {
    registry: string;
    repository?: string;
};

export type Arguments = {
    name?: string;
    version?: string;
};

export type RequestDefinition = {
    urlPrototype?: string;
    converter: (data: string | any, args: Arguments & Source) => any; 
};

export type Template = {
    name: string;
    urlPrototype: string;
    repositories: string[];
    requests: { [key:string]:RequestDefinition };
};

export enum Request {
    Meta = "meta",
    Dependencies = "deps",
    Versions = "versions"
}
