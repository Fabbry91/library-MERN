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

export const startAddUser = (user) => {
    return async (dispatch) => {
        dispatch(startLoadingRedux());
        await axios.put(`user/email/${user.email}`, user);
        dispatch(finishLoadingRedux())
    }
}

export const startDeleteUser = (id) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.delete(`User/${id}`);
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