import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../../../redux/actions/authAction';

export const Dashboard = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white vh-100">
                <Link to="/admin/informes" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </Link>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to="/admin/articles" class="nav-link align-middle px-0">
                            <i className="fs-5 bi bi-cart-fill" /> <span class="ms-1 d-none d-sm-inline">Articulos</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/rubro" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-5 bi bi-tags-fill" /> <span class="ms-1 d-none d-sm-inline">Rubros</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/rubro" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-5 bi bi-file-earmark-fill" /> <span class="ms-1 d-none d-sm-inline">Ordenes</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/personas" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-5 bi-people-fill" /> <span class="ms-1 d-none d-sm-inline">Usuarios</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/facturacion" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-5 bi bi-file-earmark-text-fill" /> <span class="ms-1 d-none d-sm-inline">Facturación</span>
                        </Link>
                    </li>


                </ul>
                <hr />
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fs-3 bi bi-person-circle" />
                        <span class="d-none d-sm-inline mx-1">Administrador</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small" aria-labelledby="dropdownUser1">
                        <li><Link class="dropdown-item" onClick={handleLogout}>Log out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
