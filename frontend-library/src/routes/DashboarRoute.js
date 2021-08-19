import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Articulos } from '../components/admin/articulo/Articulos'
import { Rubros } from '../components/admin/rubro/Rubros'

export const DashboarRoute = () => {
    return (
        <>


            <Switch>

                <Route exact path="/admin/articulos" component={Articulos} />
                <Route exact path="/admin/rubro" component={Rubros} />
                {/*client 
                 <Nabvar />
                
                <Route exact path="/kit/:id" component={KitScreen} />
                <Route exact path="/articulos" component={ArticuloList} />
                <Route exact path="/articulos/:id" component={Product} />

                {/* admin 
                <Route exact path="/admin/kit" component={AdminKit} />
                <Route exact path="/admin/articulos" component={AdminArticulo} />
                <Route exact path="/admin/pedidos" component={Pedidos} />
                <Route exact path="/admin/factura" component={Factura} />
                

                {/* UI 
                <Route exact path="/" component={Home} />
                {/*<Route exact path="/cliente-pedido" component={} />


                <Route path="/" component={Home} />*/}

                <Redirect to="/" />
            </Switch>
        </>
    )
}
