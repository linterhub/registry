
// Describes single dependency in package manager
export interface Dependency {
    manager: string;
    package: string;
    version?: string;
    target?: boolean;
}