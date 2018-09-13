import { Template, Arguments, Source } from './model/registry';
import Request from 'request-promise';
import format from 'string-format';
import { Data } from './model/data';

/**
 * This class describes abstract registry
 */
export default class Registry {

    protected context: Source;
    protected api: Template;
    
    constructor(context: Source, api?: Template) {
        this.context = context;
        this.api = api || require(`./registry/${context.registry}`);
    }

    protected async request(urlPrototype: string, args: Source & Arguments): Promise<string> {
        return JSON.parse(await Request(format(urlPrototype, args)));
    }

    public async get(method: string, args: Source & Arguments) : Promise<Data> {
        const req = this.api.requests[method];
        return {
            data: req.converter(await this.request(req.urlProrotype, args), args),
            registry: args.registry,
            repository: args.repository
        };
    }
}