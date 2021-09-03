import { types } from "../types";

const initialState = {
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.loadUser:
            return {
                ...state,
                user: [...action.payload]
            }

        case types.addUser:
            return {
                ...state,
                user: [action.payload, ...state.user]
            }


        case types.setOneUser:
            return {
                ...state,
                user: state.user.filter(us => us._id === action.payload)
            }

        case types.editUser:
            return {
                ...state,
                user: state.user.map(
                    user => user._id === action.payload._id
                        ? action.payload.user
                        : user)
            }

        case types.loadOneUser:
            return {
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                telefono: action.payload.telefono,
                email: action.payload.email,
                domicilio: {
                    calle: action.payload.domicilio.calle,
                    numero: action.payload.domicilio.numero,
                    cp: action.payload.domicilio.cp,
                    localidad: action.payload.domicilio.localidad,
                    provincia: action.payload.domicilio.provincia,
                    indicaciones: action.payload.domicilio.indicaciones,
                }
            }

        case types.deleteUser:
            return {
                ...state,
                user: state.user.filter(user => user.id !== action.payload)
            }

        default:
            return state;
    }

}