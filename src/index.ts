import { Template, Arguments, Source } from './model/registry';
import Request from 'request-promise';
import format from 'string-format';

/**
 * This class describes abstract registry
 */
export default class Registry {

    protected context: Source;
    protected api: Template;

    constructor(context: Source) {
        this.context = context;
        this.api = require(`./registry/${context.registry}`);
    }

    protected async request(urlPrototype: string, args: Source & Arguments): Promise<string> {
        return JSON.parse(await Request(format(urlPrototype, args)));
    }

    public async get<T>(method: string, args: Source & Arguments) : Promise<T & Source> {
        const req = this.api.requests[method];
        return req.converter(await this.request(req.urlProrotype, args));
    }
}