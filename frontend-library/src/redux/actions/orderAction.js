import axios from '../../services/AxiosConection'
import { types } from '../types';



export const getUser = (email) => {
    return async (dispatch) => {

        const { data } = await axios.get(`user/email/${email}`);
        dispatch(setOneArticulo(data));

    }
}

export const startAddOrder = (order) => {
    return async (dispatch) => {
        const { data } = await axios.post('order', order).then(res => res)
        dispatch(createOrden(data)); 
    }
}

export const startDeleteArticulo = (id) => {
    return async (dispatch) => {

        /* dispatch(startLoadingRedux());
         await axios.delete(`articulo/${id}`);
         dispatch(deleteArticulo(id));
         dispatch(getAllArticulo())*/
    }
}

export const setArticulo = (art) => ({
    type: types.setArticulos,
    payload: art,
})

export const setOneArticulo = (id) => ({
    type: types.setOneArticulo,
    payload: id,
})

export const createOrden = (order) => ({
    type: types.addUserOrder,
    payload: order,
})

export const deleteArticulo = (id) => ({
    type: types.removeArticulos,
    payload: id
})

export const editarArticulo = (id, articulos) => ({
    type: types.editArticulos,
    payload: {
        id,
        articulos: {
            id,
            ...articulos
        }
    }
})