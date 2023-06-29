const totals = (cart) => {
    let total = 0
    let totalAmount = 0
    for (let {price, amount} of cart.values()) {
        totalAmount += amount
        total += price * amount
    }
    return {total, totalAmount}
}
export default totals
