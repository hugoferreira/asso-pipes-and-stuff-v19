import { Queue } from '../queue';
import { sleep } from '../utils';

export class Publisher<T> {
    public MAX_NUMBER_GENERATED = 1e6

    constructor() {
    }

    async generateMessage(): Promise<any> {
        await sleep(1000)
        return Math.floor(Math.random() * this.MAX_NUMBER_GENERATED)
    }

    async publishMessage(queue: Queue.BlockingQueue<T>, message: T): Promise<void> {
        console.log("oi")
        await queue.push(message)
        console.log(message)
    }

    async run(runTime: number, queue: Queue.BlockingQueue<T>): Promise<void> {
        let start = Date.now()
        while (start + runTime > Date.now()) {
            await this.publishMessage(queue, await this.generateMessage())
        }
    }
}