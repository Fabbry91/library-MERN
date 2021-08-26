import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border border-2 border-top-0 rounded min-vh-100 border-info">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin">
                            <span data-feather="/admin/informes"></span>
                            <i className="bi bi-bar-chart-fill" />&nbsp;
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/articles">
                            <i className="bi bi-cart-fill" />&nbsp;
                            Articulos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/rubro">
                            <i className="bi bi-tags-fill" />&nbsp;
                            Rubros
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/ordenes">
                            <i className="bi bi-file-earmark-fill" />&nbsp;
                            Ordenes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/personas">
                            <i className="bi bi-people-fill" />&nbsp;
                            Usuarios
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/facturacion">
                            <i className="bi bi-file-earmark-text-fill"/>&nbsp;
                            Facturación
                        </Link>
                    </li>

                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="link-secondary" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Current month
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Last quarter
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Social engagement
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Year-end sale
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
