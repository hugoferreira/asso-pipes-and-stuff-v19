
// The only was is the _Pythonic_ way
export class DefaultDict<K, V> implements Map<K, V> {
    private dict = new Map<K, V>()
    readonly size: number;

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

    clear(): void {
        this.dict.clear()
    }

    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        this.dict.forEach(callbackfn)
    }

    *[Symbol.iterator](): IterableIterator<[K, V]> {
        for (let key of this.dict.keys()) {
            yield [key, this.dict.get(key)]
        }
    }

    entries(): IterableIterator<[K, V]> {
        return this.dict.entries()
    }

    keys(): IterableIterator<K> {
        return this.dict.keys()
    }

    values(): IterableIterator<V> {
        return this.dict.values()
    }

    [Symbol.toStringTag]: string;

}
