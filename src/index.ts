import { Template, Arguments, Source, Request as LRequest, registryList } from './model/registry';
import { Cacheable, CachedObject } from './cacheable';
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

    async get(method: LRequest, args: Arguments, updateCache: boolean = false) : Promise<Data> {
        const req = this.api.requests[method];
        const params = { ...args, ...this.context };
        const url = format(req.urlPrototype || this.api.urlPrototype, params);
        let result = {} as Data;
        let response = {} as CachedObject;

        result.request = { ...args, ...{
            registry: this.context.registry,
            repository: this.context.repository,
            type: method,
            timestamp: 0
        }};

        if (!this.isSet(url) || updateCache) {
            this.cleanCache(url);
            try {
                response = this.cache(url, await Request(url).promise())
            } catch (error) {
                result.error = (<Error>error).message;
                result.request.timestamp = Date.now();
                return result;
            }
        } else {
            response = this.cache(url);
        }

        result.data = req.converter(
            isjson(response.value) ? JSON.parse(response.value) : response.value, params);
        result.request.timestamp = response.timestamp;

        return result;
    }
}