export class AsyncSemaphore {
    private promises = Array<() => void>()

    constructor(private permits: number) {}

    signal(): void {
        this.permits += 1
        if (this.promises.length > 0) this.promises.pop()!()
    }

    async wait(): Promise<void> {
        this.permits -= 1
        if (this.permits < 0 || this.promises.length > 0)
            await new Promise(r => this.promises.unshift(r))
    }
}