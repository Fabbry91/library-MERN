import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { articuloReducer } from './reducer/articuloReducer';
import { authReducer } from './reducer/authReducer';
import { rubroReducer } from './reducer/rubroReducer';
import { uiReducer } from './reducer/uiReducer';
import { cartReducer } from './reducer/cartReducer';
import { orderReducer } from './reducer/orderReducer';
import { userReducer } from './reducer/userReducer';
import { facturaReducer } from './reducer/facturaReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    art: articuloReducer,
    rub: rubroReducer,
    cart: cartReducer,
    ord: orderReducer,
    user: userReducer,
    fact: facturaReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);