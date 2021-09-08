import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Footer = () => {

    const user = useSelector(state => state.auth)

    return (

        <div className="container-fluid py-5 bg-footer">
            <div className="row">

                <div className="col align-items-center me-2">
                    <div className="flex-grow-1 ms-3">
                        <h6 className="fw-bold text-center m-0" style={{ fontSize: 18 }}>Acerca de</h6>

                        <ul className="list mt-2">
                            <li><Link to="" className="a text-muted">Go!</Link></li>
                            <li><Link to="" className="a text-muted">Contacto</Link></li>
                            <li><Link to="" className="a a text-muted">Políticas de privacidad</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="col align-items-center me-2">
                    <div className="flex-grow-1 ms-3">
                        <h6 className="fw-bold text-center m-0" style={{ fontSize: 18 }}>Mi Usuario</h6>

                        <ul className="list mt-2">
                            {Object.keys(user).length === 0 &&
                                <>
                                    <li><Link to="/register" className="a text-muted">Registrase</Link></li>
                                    <li><Link to="/login" className="a text-muted">Ingresar</Link></li>
                                </>
                            }
                            <li><Link to="" className="a text-muted">Sobre mi</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="col align-items-center">
                    <div className="flex-shrink-0">
                        <h6 className="fw-bold text-center m-0" style={{ fontSize: 18 }}>Redes Sociales</h6>

                        <ul className="list mt-2">
                            <li><Link to="" className="a text-muted">Registrase</Link></li>
                            <li><Link to="" className="a text-muted">Ingresar</Link></li>
                            <li><Link to="" className="a text-muted">Sobre mi</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="text-center pt-4">
                <h6>© 2021 Company, Inc. All rights reserved.</h6>
            </div>
        </div>
    )
}
