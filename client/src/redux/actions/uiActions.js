import { types } from '../types'

export const setErrorRedux = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeErrorRedux = (err) => ({
    type: types.uiRemoveError
})

export const startLoadingRedux = () => ({
    type: types.uiStartLoading
})

export const finishLoadingRedux = () => ({
    type: types.uiFinishLoading
})