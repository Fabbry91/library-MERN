import './App.css';
import React from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export const App = () => { 
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}