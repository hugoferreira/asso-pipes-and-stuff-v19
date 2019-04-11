// Based on https://stackoverflow.com/questions/50382553/asynchronous-bounded-queue-in-js-ts-using-async-await

export class AsyncSemaphore {
    private promises = Array<() => void>()

    constructor(private permits: number) {}

    // Signal "I'm ready"
    signal() {
        this.permits += 1
        if (this.promises.length > 0) this.promises.pop()()
    }

    // Await on this semaphore
    async wait() {
        if (this.permits == 0 || this.promises.length > 0)
            await new Promise(r => this.promises.unshift(r))
        this.permits -= 1
    }
}