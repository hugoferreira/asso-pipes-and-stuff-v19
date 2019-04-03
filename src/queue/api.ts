import { BlockingQueue as _BlockingQueue } from './BlockingQueue'
import { AsyncQueue as _AsyncQueue } from './AsyncQueueImpl'
import { BoundedAsyncQueue as _BoundedAsyncQueue } from './BoundedAsyncQueueImpl'
import { UnboundedQueue as _UnboundedQueue } from './UnboundedAsyncQueueImpl'

export namespace Queue {

    export const BlockingQueue = _BlockingQueue;
    export type BlockingQueue<T> = _BlockingQueue<T>;

    export const AsyncQueue = _AsyncQueue;
    export type AsyncQueue<T> = _AsyncQueue<T>;

    export const BoundedAsyncQueue = _BoundedAsyncQueue;
    export type BoundedAsyncQueue<T> = _BoundedAsyncQueue<T>;

    export const UnboundedAsyncQueue = _UnboundedQueue;
    export type UnboundedAsyncQueue<T> = _UnboundedQueue<T>;

}