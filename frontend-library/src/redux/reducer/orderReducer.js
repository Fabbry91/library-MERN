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

        /* case types.editUserOrder:
             return {
                 ...state,
                 order: state.order.map(
                     order => order._id === action.payload._id
                         ? action.payload.order
                         : order)
             }
 
         case types.setUserOrder:
             return {
                 ...state,
                 order: state.order.filter(ord => ord._id === action.payload)
             }
 */
        default:
            return state;
    }
}