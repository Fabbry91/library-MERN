import axios from '../../services/AxiosConection'
import { types } from '../types';

export const addToCart = (id) => {
    return async (dispatch) => {        
        const { data } = await axios.get(`articulo/${id}`);
        dispatch(addCart(data));
    }
}

export const removeFromCart = (id) => {
    return {
        type: types.deleteCart,
        payload: {
            _id: id
        },
    };
};

export const adjustItemQty = (id, qty) => {
    return {
        type: types.adjusItemCart,
        payload: {
            _id: id,
            qty: qty,
        },
    };
};

export const addCart = (art) => ({
    type: types.addCart,
    payload: art,
})



export const clearCart=()=>({
    type: types.clearItemCart
})


