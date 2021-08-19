import { types } from "../types";

const initialState = {
    articulos: []
}

export const articuloReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.setArticulos:
            return {
                ...state,
                articulos: [...action.payload]
            }

        case types.addArticulos:
            return {
                ...state,
                articulos: [action.payload, ...state.articulos]
            }

        case types.editArticulos:
            return {
                ...state,
                articulos: state.articulos.map(
                    articulos => articulos._id === action.payload._id
                        ? action.payload.articulos
                        : articulos)
            }

        case types.setOneArticulo:
            return {
                ...state,
                articulos: state.articulos.filter(articulos => articulos._id === action.payload)
            }

        case types.removeArticulos:
            return {
                ...state,
                articulos: state.articulos.filter(articulos => articulos.id !== action.payload)
            }

        default:
            return state;
    }

}