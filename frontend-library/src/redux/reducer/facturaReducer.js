import { types } from "../types";

const initialState = {
    facturas: []
}

export const facturaReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.setFacturas:
            return {
                ...state,
                facturas: [...action.payload]
            }

        case types.addFacturas:
            return {
                ...state,
                facturas: [action.payload, ...state.facturas]
            }

        case types.setOneFactura:
            return {
                ...state,
                facturas: state.facturas.filter(fact => fact._id === action.payload)
            }

        default:
            return state;
    }

}