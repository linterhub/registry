export type CachedObject = {
    timestamp: number,
    value: any
};

export abstract class Cacheable {

    private cached: { [key: string]: CachedObject } = {};

    protected isSet(key: string) : boolean {
        return this.cached[key] ? true : false;
    }

    protected cache(key: string, value?: any) : CachedObject
    {
        if(!this.cached[key] && value) {
            this.cached[key] = {
                timestamp: Date.now(),
                value
            };
        }
        return this.cached[key];
    }

    protected cleanCache(key?: string){
        if (key) {
            delete this.cached[key];
        } else {
            this.cached = {};
        }
    }
}