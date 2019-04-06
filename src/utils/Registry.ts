
// Registry pattern
// A well-known object that other objects can use to find common objects and services.
export abstract class AbstractRegistry<K, T> {
    private map: Map<K, T>

    protected abstract generateKey(obj: T): K

    public register(obj: T): K {
        let key = this.generateKey(obj)
        this.map.set(key, obj)
        return key
    }

    public get(key: K): T | undefined {
        return this.map.get(key)
    }

}

export class Registry<T> extends AbstractRegistry<number, T> {
    private counter: number = 0

    protected generateKey(obj: T): number {
        return this.counter++
    }
}
