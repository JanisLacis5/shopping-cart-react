import {
    CLEAR_CART,
    DECREASE_AMOUNT,
    DISPLAY_ITEMS,
    INCREASE_AMOUNT,
    REMOVE_ITEM,
    LOADING,
} from "./actions"

const reducer = (state, action) => {
    if (action.type === REMOVE_ITEM) {
        const newCart = new Map(state.cart)
        newCart.delete(action.payload.id)
        return {...state, cart: newCart}
    }
    if (action.type === CLEAR_CART) {
        return {...state, cart: new Map()}
    }
    if (action.type === INCREASE_AMOUNT) {
        const newCart = new Map(state.cart)
        const item = newCart.get(action.payload.id)
        const newItem = {...item, amount: item.amount + 1}
        newCart.set(action.payload.id, newItem)
        return {...state, cart: newCart}
    }
    if (action.type === DECREASE_AMOUNT) {
        const newCart = new Map(state.cart)
        const item = newCart.get(action.payload.id)
        if (item.amount <= 1) return {...state}
        const newItem = {...item, amount: item.amount - 1}
        newCart.set(action.payload.id, newItem)
        return {...state, cart: newCart}
    }
    if (action.type === DISPLAY_ITEMS) {
        const newCart = new Map(
            action.payload.data.map((item) => [item.id, item])
        )
        return {...state, isLoading: false, cart: newCart}
    }
    if (action.type === LOADING) {
        return {...state, isLoading: true}
    }
    throw new Error(`State "${state}" is not found`)
}

export default reducer
