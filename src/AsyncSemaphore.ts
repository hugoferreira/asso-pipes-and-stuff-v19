// From https://stackoverflow.com/questions/50382553/asynchronous-bounded-queue-in-js-ts-using-async-await/50398038#50398038

export class AsyncSemaphore {
    private promises = Array<() => void>()

    constructor(private permits: number) {}

    signal() {
        this.permits += 1
        if (this.promises.length > 0) this.promises.pop()()
    }

    async wait() {
        if (this.permits == 0 || this.promises.length > 0)
            await new Promise(r => this.promises.unshift(r))
        this.permits -= 1
    }
}