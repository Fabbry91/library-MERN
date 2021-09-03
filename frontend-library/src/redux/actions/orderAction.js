import axios from '../../services/AxiosConection'
import { types } from '../types';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';



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
        console.log(email)
        dispatch(startLoadingRedux());
        const { data } = await axios.get(`order/email/${email}`);
        dispatch(setAllOrder(data));
        dispatch(finishLoadingRedux());
    }
}


export const startAddOrder = (order) => {
    return async (dispatch) => {
        
        dispatch(startLoadingRedux());
        const { data } = await axios.post('order', order).then(res => res)
        dispatch(createOrden(data));
        dispatch(finishLoadingRedux());
        return data.preferenceId
    }
}

export const startDeleteOrder = (id, user) => {
    return async (dispatch) => {

        await axios.delete(`order/${id}`);
        dispatch(deleteOrder(id));
        dispatch(getOrderByEmail(user))
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
