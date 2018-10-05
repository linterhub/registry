export type CachedObject = {
    timestamp: number,
    value: any
};

export abstract class Cacheable {

    protected cached: { [key: string]: CachedObject };

    constructor() {
        this.cached = {};
    }

    protected requestCache(key: string, value?: any) : CachedObject | undefined
    {
        if (!value) {
            return this.cached[key];
        }
        this.cached[key] = {
            timestamp: Date.now(),
            value
        };
    }

    protected async cache(promise: Promise<any>, key: string) : Promise<CachedObject>
    {
        if(!this.requestCache(key)) {
            this.requestCache(key, promise);
        }
        return this.cached[key];
    }

    protected emptyCacheValue(key?: string){
        if (key) {
            delete this.cached[key];
        } else {
            this.cached = {};
        }
    }
}