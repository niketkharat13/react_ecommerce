import * as actionTypes from './actionType';
import axios from 'axios';
export const add_to_cart = (product_obj) => {
    return {
        type: actionTypes.ADD_TO_CART,
        product: product_obj
    }
}
export const remove_from_cart = (product_id) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        id: product_id
    }
}
export const load_cart = () => {
    return {
        type: actionTypes.LOAD_CART
    }
}
export const purchase_start = () =>{
    return {
        type:actionTypes.INIT_PURCHASING
    }
}
export const purchase_succ = (prderData) => {
    return {
        type:actionTypes.PURCHASING_SUCCESSFULLY,
        payLoad: prderData
    }
}
export const purchasie_fail = () => {
    return {
        type:actionTypes.PURCHASING_FAILED
    }
}
export const purchase_init = (orderData, token) => {
    return dispatch => {
        dispatch(purchase_start());
        axios.post('https://shopping-app-a685c.firebaseio.com/order.json', orderData).then(resp => {
            dispatch(purchase_succ(orderData))
        }).catch(err => {
            dispatch(purchasie_fail(err))
        });
    }
}