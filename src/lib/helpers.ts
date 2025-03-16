// function parrellel(items: Array<object>, fn: () => void) {
//     const promises = items.map(async item => await fn(item))
//     return Promise.all(promises)
// }

// function series(items: Array<object>, fn: () => void) {
//     let result: Array<any> = []
//     return items.reduce((acc, item) => {
//         acc = acc.then(() => {
//             return fn(item).then(res => result.push(res))
//         })
//         return acc
//     }, Promise.resolve()).then(() => result, console.log(result))
// }

const splitIntoChunks = (items: Array<object>, chunkSize: number) => {
    let result = []
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize))
    }
    return result
}

export type Place = {
    name: string;
    max: number;
    rank: number;
}

export function chunks(items: Array<object>, chunkSize = 9) {
    let result: Array<any> = []
    const chunks = splitIntoChunks(items, chunkSize)
    
    return chunks
    
}