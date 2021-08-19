import { facebookAuthProvider, firebase, googleAuthProvider } from '../../firebase/firebase';
import { finishLoadingRedux, startLoadingRedux } from './uiActions';
import Swal from 'sweetalert2'
import { types } from '../types'
import axios from '../../services/AxiosConection'

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {

        dispatch(startLoadingRedux());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                dispatch(
                    login(user.uid, user.displayName, email)
                );
                dispatch(finishLoadingRedux());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoadingRedux());
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startRegisterEmailPassword = (user) => {
    return async (dispatch) => {

        const { apellido, calle, ciudad, email, localidad, nombre, password, telefono, tipo } = user

        const Usuario = {
            apellido: apellido,
            nombre: nombre,
            email: email,
            telefono: telefono,
            creacion: Date.now(),
            tipo: [tipo],
            domicilio: {
                calle: calle,
                localidad: localidad,
                ciudad: ciudad,
            }
        }
        //console.log(Usuario)

        await axios.post('user', Usuario);

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: nombre });

                dispatch(
                    login(user.uid, user.displayName, email,)
                );
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });

    }
}

export const startFacebookLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(facebookAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))
        })
    }
}

export const login = (uid, displayName, email) => ({

    type: types.login,
    payload: {
        uid,
        displayName,
        email
    }

})

export const logout = () => ({

    type: types.logout

})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
    }
}