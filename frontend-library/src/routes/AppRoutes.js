import { useDispatch } from 'react-redux'
import { firebase } from '../firebase/firebase'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { AdminRoute } from './AdminRoute'
import { PrivateRoute } from './PrivateRoute'

import axios from '../services/AxiosConection'
import { login } from '../redux/actions/authAction'
import { startGetOneUser } from '../redux/actions/userAction'

import { Users } from '../components/pages/admin/Users'
import { Rubro } from '../components/pages/admin/Rubro'
import { Ordenes } from '../components/pages/admin/Ordenes'
import { StoreGo } from '../components/pages/admin/StoreGo'
import { Informes } from '../components/pages/admin/Informes'
import { Facturacion } from '../components/pages/admin/Facturacion'

import { Home } from '../components/pages/home/Home'
import { Product } from '../components/pages/products/Product'

import { Login } from '../components/pages/auth/Login'
import { Register } from '../components/pages/auth/Register'

import { User } from '../components/pages/client/User'
import { Checkout } from '../components/pages/client/Checkout'
import { ShoppingCart } from '../components/pages/client/ShoppingCart'
import { ViewPay } from '../components/pages/client/ViewPay'

import { Loading } from '../components/ui/Loading'
import { Error404 } from '../components/ui/Error404'

export const AppRoutes = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                const { data } = await axios.get(`user/email/${user.email}`)
                dispatch(startGetOneUser(data))
                dispatch(login(user.uid, user.displayName, user.email));
                setIsAdmin(data.tipo[0])
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <Loading />
        )
    }


    return (
        <Router>
            <Switch>

                {/*Rutas Publicas*/}
                <Route
                    exact
                    path="/"
                    component={Home} />

                <Route
                    exact
                    path="/login"
                    component={Login} />

                <Route
                    exact
                    path="/register"
                    component={Register} />

                <Route
                    path=
                    "/producto/:id"
                    component={Product} />

                <Route
                    exact
                    path="/404"
                    component={Error404} />


                {/*Rutas Privadas*/}

                <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/shopping-cart"
                    component={ShoppingCart} />

                <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/user"
                    component={User} />

                <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/shopping-cart/:id?"
                    component={ShoppingCart} />

                <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/pay"
                    component={Checkout} />

                <PrivateRoute
                    exact
                    isAuthenticated={isLoggedIn}
                    path="/viewPay"
                    component={ViewPay} />


                {/*Rutas Administrador*/}
                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin"
                    component={Informes}
                />

                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin/rubro"
                    component={Rubro} />

                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin/articles"
                    component={StoreGo} />

                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin/ordenes"
                    component={Ordenes} />

                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin/facturacion"
                    component={Facturacion} />

                <AdminRoute
                    exact
                    isAuthenticated={[isLoggedIn, isAdmin]}
                    path="/admin/personas"
                    component={Users} />

                <Redirect path to="/404" />

            </Switch>
        </Router>
    )
}

