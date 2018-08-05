import { Manager } from './interface/manager';

export enum managerType {
    npm = "npm",
    pip = "pip",
    gem = "gem",
    composer = "composer"

}


export function getManager(type: managerType): Manager {
    const managerName: string = managerType[type];
    const managerClass = require(`./managers/${managerName}`);
    return new managerClass.default(managerName);
}
