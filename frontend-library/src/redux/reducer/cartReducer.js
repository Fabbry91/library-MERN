import { types } from "../types";

const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.addCart:
            const inCart = state.cart.find((item) => item._id === action.payload._id ? true : false);

            return {
                ...state,
                cart: inCart
                    ? state.cart.map((item) =>
                        item._id === action.payload._id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                    : [...state.cart, { ...action.payload, qty: 1 }]
            }

        case types.deleteCart:
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload._id)
            }

        case types.adjusItemCart:
            return {
                ...state,
                cart: state.cart.map((item) => item._id === action.payload._id
                    ? { ...item, qty: + action.payload.qty }
                    : item),
            }

        case types.clearItemCart:
            return {
                cart: [],
            }

        default:
            return state;

    }
}