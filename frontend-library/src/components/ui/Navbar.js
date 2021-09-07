import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../redux/actions/authAction';

export const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart.cart)
    const [totalItems, setTotalItems] = useState(0)
    // console.log(user)

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
        <nav className="navbar navbar-expand-lg navbar-light bg-info border border-info rounded-2 p-3 sticky-top">
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
                        {user.tipo === 'admin' &&
                            (<Link className="nav-link position-relative text-dark" to="/admin">
                                Panel Principal
                            </Link>)
                        }
                    </ul>

                    <div className="d-flex">
                        {Object.keys(user).length !== 0 ?
                            (
                                <>
                                    {user.tipo === 'admin' ?
                                        (<Link className="nav-link position-relative text-dark" to="/admin">
                                            <i className="bi bi-person-circle text-dark p-2 position-absolute top-50 start-0 translate-middle" style={{ fontSize: 30 }} />
                                            {user.name} (Administrador)
                                        </Link>)
                                        :
                                        (<Link className="nav-link position-relative text-dark" to="/user">
                                            <i className="bi bi-person-circle text-dark p-2 position-absolute top-50 start-0 translate-middle" style={{ fontSize: 30 }} />
                                            {user.name}
                                        </Link>)
                                    }
                                    {user.tipo === 'cliente' &&
                                        <Link className="nav-link position-relative" to="/client/shopping-cart">
                                            <i className="bi bi-cart3 text-dark position-absolute top-50 start-0 translate-middle-y" style={{ fontSize: 25 }}>
                                                {totalItems > 0 &&
                                                    <span className="badge-up position-absolute center-0 start-100 translate-middle badge rounded-circle" style={{ fontSize: 12 }}>
                                                        {totalItems}
                                                    </span>
                                                }
                                            </i>
                                        </Link>
                                    }
                                </>) :
                            (
                                <>
                                    <Link className="nav-link position-relative text-dark" to="/login">Ingresar</Link>
                                    <Link className="nav-link position-relative" to="/login">
                                        <i className="bi bi-cart3 text-dark position-absolute top-50 start-0 translate-middle-y" style={{ fontSize: 25 }}>
                                        </i>
                                    </Link>
                                </>
                            )
                        }

                        {Object.keys(user).length !== 0 &&
                            <button className="btn" onClick={handleLogout} >Logout</button>
                        }
                    </div>

                </div>
            </div>
        </nav>
    )
}