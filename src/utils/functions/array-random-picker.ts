/*
*  Get an array of n elements choosen from arr
*/
export function arrayRandomPicker<T>(arr: T[], n: number) {
    
    if (arr.length < n) {
        return arr    
    }
    const randIdx: number[] = []
    for (let i = 0; i < n; i ++) {
        let r = Math.floor(Math.random()*n)
        while (r in randIdx) {
            r = Math.floor(Math.random()*n)
        }
        randIdx.push(r)
    }

    const newArr = []
    for (const idx of randIdx) {
        newArr.push(arr[idx])
    }

    return newArr
}