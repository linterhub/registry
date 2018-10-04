import { Template, Arguments, Source, Request as LRequest} from './model/registry';
import Request from 'request-promise';
import format from 'string-format';
import isjson = require('is-json');
import { Data } from './model/data';

export { Source, Template, LRequest as Request, Arguments };

/**
 * This class describes abstract registry
 */
export class Registry {

    protected context: Source;
    protected api: Template;
    
    constructor(context: Source, api?: Template) {
        this.context = context;
        this.api = api || require(`./registry/${context.registry}`);
        if (!this.context.repository) {
            this.context.repository = this.api.repositories[0];
        }
    }

    protected async request(urlPrototype: string, args: Source & Arguments): Promise<string> {
        return JSON.parse(await Request(format(urlPrototype, args)));
    }

    public async get(method: string, args: Arguments) : Promise<Data> {
        const req = this.api.requests[method];
        const params = { ...args, ...this.context };
        const result = await this.request(req.urlProrotype, params);
        return {
            data: req.converter(isjson(result) ? JSON.parse(result) : result, params),
            registry: this.context.registry,
            repository: this.context.repository
        };
    }
}