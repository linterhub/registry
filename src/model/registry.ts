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
    converter: (data: string, args: Arguments & Source) => any; 
};

export type Template = {
    name: string;
    repositories: string[];
    requests: { [key:string]:Definition };
};

export enum Request {
    Meta = "meta",
    Dependencies = "deps",
    Versions = "versions"
}
