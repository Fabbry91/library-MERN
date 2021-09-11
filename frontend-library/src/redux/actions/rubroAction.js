import { types } from "../types"
import axios from '../../services/AxiosConection'
import { finishLoadingRedux, startLoadingRedux } from "./uiActions";
import Swal from "sweetalert2";



export const startAddRubro = (newRubro) => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.post('rubro', newRubro);
            const { msg } = data
            dispatch(addRubro(newRubro));
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(getAllRubro());

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `No se pudo crear Rubro`,
            })
        }

    }
}

export const startDeleteRubro = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingRedux());
            const { data } = await axios.delete(`rubro/${id}`);
            const { msg } = data
            dispatch(deleteRubro(id));
            Swal.fire({
                icon: 'success',
                title: `${msg}`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(getAllRubro());

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `No se pudo eliminar Rubro`,
            })
        }

    }
}

export const getAllRubro = () => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        const { data } = await axios.get('rubro');
        dispatch(setRubro(data))
        dispatch(finishLoadingRedux());

    }
}


export const setRubro = (rubro) => ({
    type: types.setRubro,
    payload: rubro
})

export const deleteRubro = (id) => ({
    type: types.deleteRubro,
    payload: id
})

export const addRubro = (rubro) => ({
    type: types.addRubro,
    payload: rubro
})