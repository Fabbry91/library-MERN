import { types } from "../types"
import axios from '../../services/AxiosConection'
import { finishLoadingRedux, startLoadingRedux } from "./uiActions";



export const startAddRubro = (newRubro) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.post('rubro', newRubro);
        dispatch(addRubro(newRubro));
        dispatch(getAllRubro());

    }
}

export const startDeleteRubro = (id) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        await axios.delete(`rubro/${id}`);
        dispatch(deleteRubro(id));
        dispatch(getAllRubro());

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