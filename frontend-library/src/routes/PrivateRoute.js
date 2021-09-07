import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const [isAut, isAdmin] = isAuthenticated
    console.log(isAut,isAdmin)
    return (
        <Route { ...rest }
            component={ (props) => (
                (isAut === true & isAdmin === 'cliente')
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/" /> )
            )}
        
        />
    )
}
