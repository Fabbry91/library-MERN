import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../redux/actions/authAction';

export const Navbar = () => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cart)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        let items = 0;

        cart.forEach((item) => {
            items += item.qty;
        });

        setTotalItems(items);

    }, [cart, totalItems, setTotalItems])

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info border border-info rounded-2 p-3 sticky-top mb-1">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={process.env.PUBLIC_URL + "/assets/img/go.png"} alt="logo" width="70 px" />
                </Link>
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
                            <Link className="nav-link" to="/admin">Articulos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/pedido">Pedido</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/rubro">Rubro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/404">Error</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">User</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <Link className="nav-link bg-warning rounded-circle me-3 position-relative" to="/shopping-cart">
                            <i className="bi bi-cart3 text-dark" style={{ fontSize: 20 }}>
                                { totalItems > 0 &&
                                    <span class="position-absolute center-0 start-100 translate-middle badge rounded-circle bg-danger h6">
                                        {totalItems}
                                    </span>
                                }
                            </i>
                        </Link>
                        <button className="btn" onClick={handleLogout} >Logout</button>
                    </div>

                </div>
            </div>
        </nav>
    )
}