import Manager from './interface/manager';

// Supported package managers
export enum managerType {
    npm = "npm",
    pip = "pip",
    gem = "gem",
    composer = "composer"
}

/**
 * Get all methods of package manager
 * @param {managerType} type - name of package manager  
 * @return {Manager} - package manager class
 */
export function getManager(type: managerType): Manager {
    const managerName: string = managerType[type];
    const managerClass = require(`./managers/${managerName}`);
    return new managerClass.default(managerName);
}
