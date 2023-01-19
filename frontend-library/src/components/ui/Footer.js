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
                        <h6 className="titles text-center m-0">Contacto</h6>

                        <ul className="list ">
                            <li><Link to="" className="a text-muted">Acerca de Go!</Link></li>
                            <li>San Juan 816, M5500 Mendoza</li>
                            <li>+59 4 261 123456</li>
                            <li><Link to="" className="a text-muted">go_libreria@mail.com</Link></li>
                            <li><Link to="" className="a a text-muted">Terminos y condiciones</Link></li>
                        </ul>

                    </div>
                </div>

                <div className="col align-items-center me-2">
                    <div className="flex-grow-1 ms-3">
                        <h6 className="titles text-center m-0">Mi Usuario</h6>

                        <ul className="list mt-2">
                            {Object.keys(user).length === 0 &&
                                <>
                                    <li><Link to="/register" className="a text-muted">Registrase</Link></li>
                                    <li><Link to="/login" className="a text-muted">Ingresar</Link></li>
                                </>
                            }
                            <li><Link to="/user" className="a text-muted">Mi Cuenta</Link></li>
                            <li><Link to="/" className="a text-muted">Promociones</Link></li>
                            <li><Link to="/user" className="a text-muted">Ordenes</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="col align-items-center">
                    <div className="flex-shrink-0">
                        <h6 className="titles text-center m-0">Noticias</h6>
                        <div className='container-input'>
                            <input className='e-mail' placeholder='Ingresa tu e-mail' />
                            <button className='boton-input'>
                                <img className='arrow' alt=''/>
                            </button>
                        </div>

                        <ul className="noticias">
                            <li><Link to="" className="a text-muted">Term & Condiciones</Link></li>
                            <li><Link to="" className="a text-muted">Politicas</Link></li>
                            <li><Link to="" className="a text-muted">Ubicación</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="companies-container text-center">
                <h6 className='companies'>© 2021 Company, Inc. All rights reserved.</h6>
            </div>
        </div>
    )
}
