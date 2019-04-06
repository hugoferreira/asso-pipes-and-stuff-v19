
// The only was is the _Pythonic_ way
export class DefaultDict<K extends object, V> implements WeakMap<K, V> {
    private dict = new WeakMap<K, V>()

    constructor(readonly defaultFactory: () => V) {}
    
    delete(key: K): boolean {
        return this.dict.delete(key)
    }
    
    get(key: K): V {
        if (! this.has(key)) {
            this.dict.set(key, this.defaultFactory())
        }
        return this.dict.get(key)
    }
    
    has(key: K): boolean {
        return this.dict.has(key)
    }
    
    set(key: K, value: V): this {
        this.dict.set(key, value)
        return this
    }

    [Symbol.toStringTag]: string;

}