import { fileUpload } from '../../helper/fileUpload';
import axios from '../../services/AxiosConection'
import { types } from '../types';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';



export const getAllArticulo = () => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { data } = await axios.get('articulo');
        dispatch(setArticulo(data));
        dispatch(finishLoadingRedux())

    }
}

export const getOneArticulo = (id) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.get(`articulo/${id}`);
        dispatch(setOneArticulo(id));
        dispatch(finishLoadingRedux())

    }
}

export const startAddArticulo = (art) => {
    return async (dispatch) => {

        if (art.url.length === 1) {
            const arti = art.url[0];
            const fileUrl = await fileUpload(arti);
            const newArt = { ...art, url: fileUrl }
            dispatch(startLoadingRedux());
            if (!art._id) {
                await axios.post('articulo', newArt);
                dispatch(createArticulo(newArt));
            } else {
                await axios.put(`articulo/${newArt._id}`, newArt);
                dispatch(editarArticulo(newArt._id, newArt));
            }
        } else {
            dispatch(startLoadingRedux());
            if (!art._id) {
                await axios.post('articulo', art);
                dispatch(createArticulo(art));
            } else {
                await axios.put(`articulo/${art._id}`, art);
                dispatch(editarArticulo(art._id, art));
            }
        }

        dispatch(getAllArticulo());

    }
}

export const startDeleteArticulo = (id) => {
    return async (dispatch) => {

        //console.log(id)

        dispatch(startLoadingRedux());
        await axios.delete(`articulo/${id}`);
        dispatch(deleteArticulo(id));
        dispatch(getAllArticulo())
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

export const createArticulo = (art) => ({
    type: types.addArticulos,
    payload: art,
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