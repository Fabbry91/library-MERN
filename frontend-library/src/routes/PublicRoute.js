import React from 'react';

import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const [isAdmin] = isAuthenticated
    //console.log(isAdmin)

    return (
        <Route {...rest}
            component={(props) => (
                (isAdmin === 'cliente')
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}
        />
    )
}
