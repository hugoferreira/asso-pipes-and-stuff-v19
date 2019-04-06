import { BlockingQueue as _BlockingQueue } from './BlockingQueue'
import { AsyncQueue as _AsyncQueue } from './UnboundedAsyncQueue'
import { UnboundedQueue as _UnboundedQueue } from './UnboundedAsyncQueue'
import { BoundedQueue as _BoundedQueue } from './BoundedAsyncQueue'

export namespace Queue {

    export const BlockingQueue = _BlockingQueue;
    export type BlockingQueue<T> = _BlockingQueue<T>;

    export const AsyncQueue = _AsyncQueue;
    export type AsyncQueue<T> = _AsyncQueue<T>;

    export const BoundedQueue = _BoundedQueue;
    export type BoundedQueue<T> = _BoundedQueue<T>;

    export const UnboundedQueue = _UnboundedQueue;
    export type UnboundedQueue<T> = _UnboundedQueue<T>;

}