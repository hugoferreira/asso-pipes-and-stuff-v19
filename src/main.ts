import { createReadStream } from 'fs'
import { createInterface, Interface } from 'readline'
const { once } = require('events');

interface Filter {
    next(): Promise<Message>
    hasNext(): Boolean
}

class Message {
    constructor(public readonly value: any) { }
    static none = new Message(null)
}

// class Concatenate implements Filter{
//     constructor(public readonly a: Filter, public readonly b: Filter) { }

//     do(): Message {
//         return new Message(this.a.do().value.toString() + this.b.do().value.toString())
//     }
// }

// class ConstantString implements Filter {
//     constructor(public readonly c: string) {}

//     do(): Message {
//         return new Message(this.c)
//     }
// }

class ToUpperCase implements Filter {
    constructor(public readonly f: Filter) { }
    async next(): Promise<Message> {
        const msg = await this.f.next()
        return new Message(msg.value.toUpperCase())
    }

    hasNext(): Boolean {
        return this.f.hasNext()
    }
}

class Writer implements Filter {
    constructor(public readonly f: Filter) { }
    async next(): Promise<Message> {
        const msg = await this.f.next()
        console.log('\n\n********* ' + msg.value.toString() + '***********\n\n')
        return Message.none
    }

    hasNext(): Boolean {
        return this.f.hasNext()
    }
}

class FileLineReader implements Filter {
    lineReader: Interface
    buffer: string[]
    ended: Boolean

    constructor(public readonly fileName: string) {
        this.lineReader = createInterface({
            input: createReadStream(fileName)
        })

        this.buffer = []
        this.ended = false

        this.lineReader.on('line', (input) => {
            this.buffer.push(input)

            console.log('\non LINE:')
            console.log(input)
            console.log(this.buffer)
            console.log(this.ended)
        })

        this.lineReader.on('close', () => {
            this.ended = true

            console.log('\non CLOSE:')
            console.log(this.buffer)
            console.log(this.ended)
        })

    }

    async readSingleLine(): Promise<string> {
        return once(this.lineReader, 'line')
    }

    async next(): Promise<Message> {
        let line = ''
        if (this.buffer.length > 0) {
            line = this.buffer.shift()
        } else {
            line = await this.readSingleLine()
        }

        return new Message(line)
    }

    hasNext(): Boolean {
        return (this.buffer.length == 0) && this.ended
    }
}

class SlowFileLineReader extends FileLineReader {
    constructor(public readonly fileName: string) {
        super(fileName)
    }  

    delay(millis: number) {
        const date = new Date()
        let curDate = null
        do { 
            curDate = new Date() 
        } while (curDate.getTime() - date.getTime() < millis)
    }

    async next(): Promise<Message> {
        this.delay(2000)
        return new Message(this.buffer.shift())
    }
}

class Join implements Filter {
    fs: Filter[]
    currentFilter = 0

    constructor(...fs: Filter[]) { 
        this.fs = fs
    }

    async next(): Promise<Message> {
        const f = this.fs[this.currentFilter]
        this.currentFilter = (this.currentFilter + 1) % this.fs.length
        if (f.hasNext()) return f.next()
        else return this.next()
    }

    hasNext(): Boolean {
        return this.fs.filter(f => f.hasNext()).length > 0
    }
}

async function iterate(f: Filter) {
    while (f.hasNext()) {
        await f.next()
    }
}

// const f2 = new FileLineReader('./best-mieic.txt')
// const f1 = new SlowFileLineReader('./best15.txt')

// const r1 = new Writer(new ToUpperCase(new Join(f1, f2)))

const r1 = new Writer(new ToUpperCase(new FileLineReader('./best-mieic.txt')));

(async () => {
    let ret = await iterate(r1)
    console.log(ret)
})();
