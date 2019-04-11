import { AsyncSemaphore } from './AsyncSemaphore'
import { DefaultDict } from './DefaultDict'
import { Registry } from './Registry'


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    AsyncSemaphore,
    DefaultDict,
    Registry
}