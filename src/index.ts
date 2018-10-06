import { Template, Arguments, Source, Request as LRequest, registryCollection, RegistryType } from './model/registry';
import { Cacheable, CachedObject } from './cacheable';
import Request from 'request-promise';
import mustache from 'mustache';
import isjson = require('is-json');
import { Data, Meta, Dependency } from './model/data';

export { Source, Template, LRequest as Request, Arguments, Meta, Dependency, Data };
export { registryCollection as RegistryCollection };

/**
 * This class describes abstract registry
 */
export class Registry extends Cacheable {

    protected context: Source;
    protected instance: Template;
    
    constructor(instance: Template, repository?: string) {
        super();
        this.context = {
            registry: instance.name as RegistryType,
            repository : repository || instance.repositories[0]
        };
        this.instance = instance;
    }

    async get(method: LRequest, args: Arguments, updateCache: boolean = false) : Promise<Data> {
        const req = this.instance.requests[method];
        const params = { ...args, ...this.context };
        const url = mustache.render(req.urlPrototype || this.instance.urlPrototype, {...params, ...{
            lower: () => (text: string, render: (x: string) => string) => render(text).toLocaleLowerCase()
        }});
        const result = {} as Data;
        let response = {} as CachedObject;

        result.request = { ...params, ...{
            type: method,
            timestamp: 0
        }};

        if (!this.isSet(url) || updateCache) {
            this.cleanCache(url);
            try {
                response = this.cache(url, await Request(url).promise());
            } catch (error) {
                result.error = (error as Error).message;
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