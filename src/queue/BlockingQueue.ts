/**
 * Generic interface for a blocking Queue.
 */

export abstract class BlockingQueue<T> {
    abstract push (val: T) : void;
    abstract pop () : Promise<T>;
}

