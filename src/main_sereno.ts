import { readFileSync, fstat } from 'fs'

interface Filter {
    next(): Message
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
    next(): Message {
       return new Message(this.f.next().value.toUpperCase())
    }

    hasNext(): Boolean {
        return this.f.hasNext()
    }
}

class Writer implements Filter {
    constructor(public readonly f: Filter) { }
    next(): Message {
        console.log(this.f.next().value.toString())
        return Message.none
    }

    hasNext(): Boolean {
        return this.f.hasNext()
    }
}

class FileLineReader implements Filter {
    lines: string[]
    constructor(public readonly fileName: string) {
        this.lines = readFileSync(fileName, 'utf-8').split('\n')
    }

    next(): Message {
        return new Message(this.lines.shift())
    }

    hasNext(): Boolean {
        return this.lines.length > 0
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

    next(): Message {
        this.delay(2000)
        return new Message(this.lines.shift())
    }
}

class Join implements Filter {
    fs: Filter[]
    currentFilter = 0

    constructor(...fs: Filter[]) { 
        this.fs = fs
    }

    next(): Message {
        const f = this.fs[this.currentFilter]
        this.currentFilter = (this.currentFilter + 1) % this.fs.length
        if (f.hasNext()) return f.next()
        else return this.next()
    }

    hasNext(): Boolean {
        return this.fs.filter(f => f.hasNext()).length > 0
    }
}

function iterate(f: Filter) {
    while(f.hasNext()) { 
        f.next()
    }  
}

const f1 = new SlowFileLineReader('./best15.txt')
const f2 = new FileLineReader('./best-mieic.txt')

const r1 = new Writer(new ToUpperCase(new Join(f1, f2)))

iterate(r1)
