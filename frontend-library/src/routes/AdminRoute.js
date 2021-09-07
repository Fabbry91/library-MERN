import React from 'react';

import { Route, Redirect } from 'react-router-dom';


export const AdminRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const [isAut, isAdmin] = isAuthenticated
    console.log(isAut, isAdmin)

    return (
        <>

            {<Route {...rest}
            component={(props) => (
                (isAut === true & isAdmin === 'admin')
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}
            />}
        </>
    )
}
