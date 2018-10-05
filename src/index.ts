import { Template, Arguments, Source, Request as LRequest, registryList } from './model/registry';
import { Cacheable } from './cacheable';
import Request from 'request-promise';
import format from 'string-format';
import isjson = require('is-json');
import { Data } from './model/data';

export { Source, Template, LRequest as Request, Arguments };

/**
 * This class describes abstract registry
 */
export class Registry extends Cacheable {

    protected context: Source;
    protected api: Template;
    
    constructor(context: Source, api?: Template) {
        super();
        this.context = context;
        this.api = api || registryList[context.registry];
        if (!this.context.repository) {
            this.context.repository = this.api.repositories[0];
        }
    }

    protected async request(urlPrototype: string, args: Source & Arguments): Promise<any> {
        const url = format(urlPrototype, args);
        const req = Request(url);
        return await req.then(x => this.cache(x, url));
    }

    public async get(method: string, args: Arguments) : Promise<Data> {
        const req = this.api.requests[method];
        const params = { ...args, ...this.context };
        const result = await this.request(
            req.urlPrototype || this.api.urlPrototype, params);
        return {
            data: req.converter(isjson(result) ? JSON.parse(result) : result, params),
            registry: this.context.registry,
            repository: this.context.repository
        };
    }
}