import * as actionTypes from '../action/actionType';
import {
    updateState
} from '../../shared/utility';
const initialState = {
    carts: [],
    loading: false,
    purchased: false,
    total: 0
}
const addtocart = (state, action) => {
    let updatedCart = state.carts;
    updatedCart.push(action.product);
    const newState = {
        carts: updatedCart,
        total: state.total + Math.ceil(action.product.price),
    }
    localStorage.setItem('cart', JSON.stringify(newState.carts))
    localStorage.setItem('grand_total', newState.total)
    return updateState(state, newState);
}
const removefromcart = (state, action) => {
    let updatedCart = state.carts;
    let remove_product = updatedCart.find(i => i.id === action.id);
    let index_of_product = updatedCart.indexOf(remove_product);
    updatedCart.splice(index_of_product, 1);
    const newState = {
        carts: updatedCart,
        total: state.total - Math.ceil(remove_product.price),
    }
    localStorage.setItem('cart', JSON.stringify(newState.carts))
    localStorage.setItem('grand_total', newState.total)
    return updateState(state, newState);
}
const loadCart = (state, action) => {
    let cartData = localStorage.getItem('cart');
    let grandtotal = localStorage.getItem('grand_total');
    if (cartData && grandtotal) {
        cartData = JSON.parse(cartData);
        const newState = {
            carts: cartData,
            total: parseInt(grandtotal),
        }
        return updateState(state, newState);
    }
    return state;
}
const reset_cart = (state, action) => {
    const newState = {
        carts: [],
        total: 0
    }
    localStorage.removeItem("cart");
    localStorage.removeItem("grand_total");
    return updateState(state, newState);
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return addtocart(state, action)
        case actionTypes.REMOVE_FROM_CART:
            return removefromcart(state, action)
        case actionTypes.LOAD_CART:
            return loadCart(state, action)
        case actionTypes.PURCHASING_SUCCESSFULLY:
            return reset_cart(state, action)
        // case actionTypes.INIT_PURCHASING:
            // return init_orders(state, action)
        // case actionTypes.PURCHASING_FAILED:
            // return init_orders(state, action)
        default:
            return state;
    }
}
export default reducer;