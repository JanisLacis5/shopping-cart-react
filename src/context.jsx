import {createContext, useContext, useEffect, useReducer} from "react"
import reducer from "./reducer"
import cartItems from "./data"
import {
    REMOVE_ITEM,
    CLEAR_CART,
    INCREASE_AMOUNT,
    DECREASE_AMOUNT,
    DISPLAY_ITEMS,
    LOADING,
} from "./actions"
const url = "https://www.course-api.com/react-useReducer-cart-project"

const defaultState = {
    isLoading: false,
    cart: new Map(),
}

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const removeItem = (id) => {
        dispatch({type: REMOVE_ITEM, payload: {id}})
    }
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    const increase = (id) => {
        dispatch({type: INCREASE_AMOUNT, payload: {id}})
    }
    const decrease = (id) => {
        dispatch({type: DECREASE_AMOUNT, payload: {id}})
    }
    const fetchData = async () => {
        dispatch({type: LOADING})
        const response = await fetch(url)
        const data = await response.json()
        dispatch({type: DISPLAY_ITEMS, payload: {data}})
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <GlobalContext.Provider
            value={{...state, clearCart, removeItem, increase, decrease}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext
