import Swal from 'sweetalert2';
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
        try {


            if (art.url.length === 1) {
                const arti = art.url[0];
                const fileUrl = await fileUpload(arti);
                const newArt = { ...art, url: fileUrl }
                dispatch(startLoadingRedux());
                if (!art._id) {

                    const { data } = await axios.post('articulo', newArt).then(resp => resp);
                    const { msg } = data
                    Swal.fire({
                        icon: 'success',
                        title: `${msg}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    dispatch(createArticulo(newArt));

                } else {
                    const { data } = await axios.put(`articulo/${newArt._id}`, newArt).then(resp => resp);
                    const { msg } = data
                    Swal.fire({
                        icon: 'success',
                        title: `${msg}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    dispatch(editarArticulo(newArt._id, newArt));
                }
            } else {

                dispatch(startLoadingRedux());
                if (!art._id) {
                    const { data } = await axios.post('articulo', art).then(resp => resp);
                    const { msg } = data
                    Swal.fire({
                        icon: 'success',
                        title: `${msg}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    dispatch(createArticulo(art));
                } else {
                    const { data } = await axios.put(`articulo/${art._id}`, art).then(resp => resp);
                    const { msg } = data
                    Swal.fire({
                        icon: 'success',
                        title: `${msg}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    dispatch(editarArticulo(art._id, art));
                }

            }

            dispatch(getAllArticulo());
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Hubo un error al cargar el Articulo`,
            })
        }

    }
}

export const startDeleteArticulo = (id) => {
    return async (dispatch) => {

        //console.log(id)
        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.delete(`articulo/${id}`);
            const { msg } = data
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(deleteArticulo(id));
            dispatch(getAllArticulo())

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Hubo un error al eliminar el Articulo`,
            })
        }
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