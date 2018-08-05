import { Manager } from './interface/manager';

export enum managerType {
    npm = "npm"
}


export function getManager(type: managerType): Manager {
    const managerName: string = managerType[type];
    const managerClass = require(`./managers/${managerName}`);
    return new managerClass.default(managerName);
}
