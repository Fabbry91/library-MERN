import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Rubro } from '../components/pages/admin/Rubro'
import { StoreGo } from '../components/pages/admin/StoreGo'
import { User } from '../components/pages/User'
import { Checkout } from '../components/pages/Checkout'
import { Error404 } from '../components/pages/Error404'
import { Home } from '../components/pages/home/Home'
import { Login } from '../components/pages/Login'
import { Product } from '../components/pages/Product'
import { Register } from '../components/pages/Register'
import { ShoppingCart } from '../components/pages/ShoppingCart'
import { Loading } from '../components/ui/Loading'
import { firebase } from '../firebase/firebase'
import { login } from '../redux/actions/authAction'
import { PrivateRoute } from './PrivateRoute'

export const AppRoutes = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email));
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

                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={Error404} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route path="/producto/:id" component={Product} />
                <Route exact path="/shopping-cart/:id?" component={ShoppingCart} />
                <Route exact path="/pay" component={Checkout} />
                <Route exact path="/admin" component={StoreGo} />
                <Route exact path="/admin/rubro" component={Rubro} />
            </Switch>
        </Router>
    )
}

