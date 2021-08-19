import React from 'react'
//import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
//import { startLogout } from '../../redux/actions/authAction';

export const Navbar = () => {

   /* const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }*/

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/articulos">Articulos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/kit">Kits</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/pedido">Pedido</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/factura">Factura</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/rubro">Rubro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shopping-cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/404">Error</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/order">Ola</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button className="btn btn-outline" >Logout</button>
                    </div>

                </div>
            </div>
        </nav>
    )
}