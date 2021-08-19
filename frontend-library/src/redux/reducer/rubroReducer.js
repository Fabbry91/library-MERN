import { types } from "../types";

const initialState = {
    rubro: []
}

export const rubroReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.setRubro:
            return {
                ...state,
                rubro: [...action.payload]
            }

        case types.addRubro:
            return {
                ...state,
                rubro: [action.payload, ...state.rubro]
            }

        case types.deleteRubro:
            return {
                ...state,
                rubro: state.rubro.filter(rubro => rubro.id !== action.payload)
            }

        default:
            return state;
    }
}