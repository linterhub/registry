export abstract class Cacheable {

    protected cached: { [key: string]: any };

    constructor() {
        this.cached = {};
    }

    protected requestCache(key: string, value?: any) : any
    {
        if (!value) {
            if(this.cached[key] === undefined){
                return false;
            }
            return this.cached[key];
        }
        this.cached[key] = value;
    }

    async cache(promise: Promise<any>, key: string) : Promise<any>
    {
        if(!this.requestCache(key)) {
            this.requestCache(key, promise);
        }
        return this.requestCache(key);
    }
}