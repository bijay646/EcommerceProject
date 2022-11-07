import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducer from "./reducers/cartReducer";
import itemReducer from "./reducers/itemReducer";
import { orderReducer,myOrderReducer,orderDetailsReducer } from "./reducers/orderReducer";


const rootReducer = combineReducers({
    cart: cartReducer,
    item:itemReducer,
    order: orderReducer,
    myOrders : myOrderReducer,
    orderDetails : orderDetailsReducer
})

const initialState = {
    cart: {
        cart_items: localStorage.getItem('cart_items')? JSON.parse(localStorage.getItem('cart_items')): [],
        shipping_info: localStorage.getItem('shipping_info')? JSON.parse(localStorage.getItem('shipping_info')): {}
    }
}

const middleware = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))