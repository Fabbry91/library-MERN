import axios from '../../services/AxiosConection'
import { types } from '../types';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';
import Swal from 'sweetalert2'



export const getAllOrder = () => {
    return async (dispatch) => {
        dispatch(startLoadingRedux());
        const { data } = await axios.get(`order`);
        dispatch(setAllOrder(data));
        dispatch(finishLoadingRedux());
    }
}


export const getOrderByEmail = (email) => {
    return async (dispatch) => {
        //console.log(email)
        dispatch(startLoadingRedux());
        const { data } = await axios.get(`order/email/${email}`);
        dispatch(setAllOrder(data));
        dispatch(finishLoadingRedux());
    }
}


export const startAddOrder = (order) => {
    return async (dispatch) => {

        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.post('order', order).then(res => res)
            const { msg, orden } = data
            dispatch(createOrden(orden));
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(finishLoadingRedux());
            console.log(msg)
            return orden.preferenceId
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `No se pudo crear Orden`,
            })
        }
    }
}

export const startDeleteOrder = (id, user) => {
    return async (dispatch) => {

        try {
            const { data } = await axios.delete(`order/${id}`).then(res => res);
            Swal.fire({
                icon: 'success',
                title: `${data.msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(deleteOrder(id));
            dispatch(getOrderByEmail(user))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `No se pudo eliminar Orden`,
            })
        }


    }
}


export const createOrden = (order) => ({
    type: types.addUserOrder,
    payload: order,
})


export const setAllOrder = (ord) => ({
    type: types.setUserOrder,
    payload: ord,
})

export const setOneArticulo = (id) => ({
    type: types.setOneArticulo,
    payload: id,
})



export const deleteOrder = (id) => ({
    type: types.deleteUserOrder,
    payload: id
})
