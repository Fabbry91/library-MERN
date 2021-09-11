import Swal from 'sweetalert2';
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
        try {
            const { data } = await axios.post(`facturacion`, orden).then(res => res);
            const { msg, fact } = data
            await axios.put(`order/${orden._id}`);

            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(getAllOrder())
            dispatch(createFactura(fact))

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `No se pudo crear Factura`,
            })
        }

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

