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
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >
                    <img src={process.env.PUBLIC_URL + "/assets/img/go.png"} alt="logo" width="100 px" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user.tipo === 'admin' &&
                            (<li className="nav-item">
                                <Link to="/admin" className="nav-link" >Panel Principal</Link>
                            </li>)
                        }
                    </ul>

                    <div className="d-flex">
                        {Object.keys(user).length !== 0 ?
                            (
                                <>
                                    {user.tipo === 'admin' ?
                                        (<Link to="/admin" className="nav-link position-relative" >
                                            <span style={{color:'#00d8e0', fontWeight:600, letterSpacing:'1px'}}>{user.name}</span> (Administrador)
                                            <img className='img-header' style={{ marginLeft: '0.9em' }} src={`${process.env.PUBLIC_URL}/assets/icons/user.png`} alt="user" />
                                        </Link>)
                                        :
                                        (<Link to="/user" className="nav-link position-relative" >
                                            <span style={{color:'#00d8e0', fontWeight:600, letterSpacing:'1px'}}>{user.name}</span>
                                            <img className='img-header' style={{ marginLeft: '0.9em' }} src={`${process.env.PUBLIC_URL}/assets/icons/user.png`} alt="user" />
                                        </Link>)
                                    }
                                    {user.tipo === 'cliente' &&
                                        <Link to="/shopping-cart" className="nav-link position-relative" >
                                            <img className='img-header' src={`${process.env.PUBLIC_URL}/assets/icons/cart.png`} alt="user" />
                                                {totalItems > 0 &&
                                                    <div className="badge-up position-absolute center-0 start-100 translate-middle badge rounded-circle" style={{ fontSize: 12 }}>
                                                        {totalItems}
                                                    </div>
                                                }
                                        </Link>
                                    }
                                </>) :
                            (
                                <>
                                    <Link to="/login" className="nav-link position-relative" >
                                        <img className='img-header' src={`${process.env.PUBLIC_URL}/assets/icons/user.png`} alt="user" />
                                    </Link>
                                    <Link to="/login" className="nav-link position-relative" >
                                        <img className='img-header' src={`${process.env.PUBLIC_URL}/assets/icons/cart.png`} alt="cart" />
                                    </Link>
                                </>
                            )
                        }

                        {Object.keys(user).length !== 0 &&
                            <Link to="/login" className="nav-link position-relative img-exit" >
                                <img className='img-header' src={`${process.env.PUBLIC_URL}/assets/icons/exit.png`} onClick={handleLogout} alt="exit" />

                                <div className="badge exit" style={{ fontSize: 12 }}>
                                    Salir
                                </div>
                            </Link>
                        }
                    </div>

                </div>
            </div>
        </nav>
    )
}