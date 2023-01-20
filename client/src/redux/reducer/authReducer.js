import { types } from '../types'
/*
{
    uid:'',
    name:''
}
*/


export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
                tipo: action.payload.tipo
            }

        case types.logout:
            return {}

        default:
            return state;
    }

}