export function delay(millis: number) {
    const date = new Date()
    let curDate = null
    do { 
        curDate = new Date() 
    } while (curDate.getTime() - date.getTime() < millis)
}