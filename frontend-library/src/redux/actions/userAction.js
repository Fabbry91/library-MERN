import axios from '../../services/AxiosConection'
import { types } from '../types';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';



export const getAllUser = () => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { data } = await axios.get('user');
        dispatch(setUser(data));
        dispatch(finishLoadingRedux())

    }
}

export const getOneUser = (user) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { nombre, apellido, telefono, email, indicaciones } = user
        const { calle, numero, cp, localidad, provincia } = user.domicilio
        dispatch(setOneUser(nombre, apellido, telefono, email, indicaciones, calle, numero, cp, localidad, provincia));
        dispatch(finishLoadingRedux())

    }
}

export const startEditByEmail = (user) => {
    return async (dispatch) => {
        dispatch(startLoadingRedux());
        await axios.put(`user/email/${user.email}`, user);
        dispatch(finishLoadingRedux())
    }
}

export const startEditUser = (data) => {
    return async (dispatch) => {
        console.log(data)
        const { _id, apellido, calle, cp, email, localidad, nombre, numero, provincia, telefono, tipo } = data
        const user = {
            apellido: apellido,
            nombre: nombre,
            telefono: telefono,
            tipo: [tipo],
            email: email,
            domicilio: {
                localidad: localidad,
                calle: calle,
                numero: numero,
                cp: cp,
                provincia: provincia
            }
        }
        dispatch(startLoadingRedux());
        await axios.put(`user/${_id}`, user);
        dispatch(getAllUser())
        dispatch(finishLoadingRedux())
    }
}







export const startDeleteUser = (id) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.delete(`user/${id}`);
        dispatch(getAllUser())
        dispatch(finishLoadingRedux())
    }
}

export const setUser = (us) => ({
    type: types.loadUser,
    payload: us,
})

export const setOneUser = (nombre, apellido, telefono, email, indicaciones, calle, numero, cp, localidad, provincia) => ({
    type: types.loadOneUser,
    payload: {
        nombre,
        apellido,
        telefono,
        email,
        indicaciones,
        domicilio: {
            calle,
            numero,
            cp,
            localidad,
            provincia,
        }
    }
})

export const createUser = (art) => ({
    type: types.addUsers,
    payload: art,
})

export const deleteUser = (id) => ({
    type: types.removeUsers,
    payload: id
})

export const editarUser = (id, Users) => ({
    type: types.editUsers,
    payload: {
        id,
        Users: {
            id,
            ...Users
        }
    }
})