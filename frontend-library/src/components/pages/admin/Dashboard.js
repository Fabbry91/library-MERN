import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../../../redux/actions/authAction';

export const Dashboard = () => {

    const dispatch = useDispatch()

    //const user = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (

        <nav className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white vh-100">
                <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <i className="fs-5 bi bi-house-fill" /> &nbsp;
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                    <li className="nav-item">
                        <Link to="/admin" className="nav-link align-middle px-0">
                            <i className="fs-5 bi bi-info-square-fill" /> <span className="ms-1 d-none d-sm-inline">Informes</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/articles" className="nav-link align-middle px-0">
                            <i className="fs-5 bi bi-cart3" /> <span className="ms-1 d-none d-sm-inline">Articulos</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/rubro" className="nav-link align-middle px-0">
                            <i className="fs-5 bi bi-tags-fill" /> <span className="ms-1 d-none d-sm-inline">Rubros</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/ordenes" className="nav-link align-middle px-0">
                            <i className="fs-5 bi bi-file-earmark-fill" /> <span className="ms-1 d-none d-sm-inline">Ordenes</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/personas" className="nav-link align-middle px-0">
                            <i className="fs-5 bi-people-fill" /> <span className="ms-1 d-none d-sm-inline">Usuarios</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/facturacion" className="nav-link align-middle px-0">
                            <i className="fs-5 bi-file-earmark-text-fill" /> <span className="ms-1 d-none d-sm-inline">Facturación</span>
                        </Link>
                    </li>


                </ul>

                <hr />
                <div className="dropdown pb-4">
                    <Link to="/#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fs-3 bi bi-person-circle" />
                        <span className="d-none d-sm-inline mx-1">Administrador</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small" aria-labelledby="dropdownUser1">
                        <li><Link to="/" className="dropdown-item" onClick={handleLogout}>Log out</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
