export function createListId() {
    return Math.floor(Math.random() * 10000000)
}


export function reorder(initialArr, order, key) {
    let newArr = initialArr.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return newArr
}
