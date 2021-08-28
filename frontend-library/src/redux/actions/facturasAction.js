import axios from '../../services/AxiosConection'
import { types } from '../types';
import { getAllOrder } from './orderAction';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';



export const getAllFacturas = () => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { data } = await axios.get('facturacion');
        dispatch(setFactura(data));
        dispatch(finishLoadingRedux())

    }
}

export const getOneFactura = (id) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.get(`articulo/${id}`);
        dispatch(setOneFactura(id));
        dispatch(finishLoadingRedux())

    }
}

export const startAddFactura = (orden) => {
    return async (dispatch) => {

        const { data } = await axios.post(`facturacion`, orden);
        await axios.put(`order/${orden._id}`);
        await dispatch(getAllOrder())
        dispatch(createFactura(data))

    }
}

export const createFactura = (fact) => ({
    type: types.addFacturas,
    payload: fact,
})

export const setFactura = (fact) => ({
    type: types.setFacturas,
    payload: fact,
})

export const setOneFactura = (id) => ({
    type: types.setOneFactura,
    payload: id,
})

