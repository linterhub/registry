// Describes single dependency in package manager
export default interface Dependency {
    manager: string;
    package: string;
    version?: string;
    target?: boolean;
}