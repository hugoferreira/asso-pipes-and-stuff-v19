import {Queue} from "../queue/api";
import { delay } from "../utils/utils";


export class Publisher<T> {
    public MAX_NUMBER_GENERATED = 1e6

    constructor(public id: number) {

    }

    generateMessage(): any {
        delay(1000)
        return Math.floor(Math.random() * this.MAX_NUMBER_GENERATED)
    }

    async publishMessage(queue: Queue.BlockingQueue<T>, message: T): Promise<void> {
        await queue.push(message)
    }

    async run(time: Number, queue: Queue.BlockingQueue<T>): Promise<void> {
        while (time > Date.now()) {
            await this.publishMessage(queue, this.generateMessage())
        }
    }
}