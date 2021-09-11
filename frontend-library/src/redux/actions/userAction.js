import Swal from 'sweetalert2';
import axios from '../../services/AxiosConection'
import { types } from '../types';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';

export const startGetAllUsers = () => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { data } = await axios.get('user');
        dispatch(setUsers(data));
        dispatch(finishLoadingRedux())

    }
}

export const startGetOneUser = (user) => {
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
        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.put(`user/email/${user.email}`, user);
            const { msg } = data
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(finishLoadingRedux())

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Hubo un error al editar el Articulo`,
            })
        }
    }
}

export const startEditUser = (us) => {
    return async (dispatch) => {
        try {
            const { _id, apellido, calle, cp, email, localidad, nombre, numero, provincia, telefono, tipo } = us
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
            const { data } = await axios.put(`user/${_id}`, user);
            const { msg } = data
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(startGetAllUsers())
            dispatch(finishLoadingRedux())

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Hubo un error al editar Usuario`,
            })
        }
    }
}

export const startDeleteUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.delete(`user/${id}`);
            const { msg } = data
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(startGetAllUsers())
            dispatch(finishLoadingRedux())

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Hubo un error al eliminar el Articulo`,
            })
        }
    }
}



//FUNCIONES CON TYPE

export const createUser = (user) => ({
    type: types.addUser,
    payload: user,
})

export const setUsers = (us) => ({
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