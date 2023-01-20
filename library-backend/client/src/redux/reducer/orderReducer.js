import { types } from "../types";

const initialState = {
    order: []
}

export const orderReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.addUserOrder:
            return {
                ...state,
                order: [action.payload, ...state.order]
            }

        case types.setUserOrder:
            return {
                ...state,
                order: [...action.payload]
            }

        case types.deleteUserOrder:
            return {
                ...state,
                order: state.order.filter(ord => ord.id !== action.payload)
            }

        case types.clearUserOrder:
            return state

        default:
            return state;
    }
}