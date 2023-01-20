import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Footer = () => {

    const user = useSelector(state => state.auth)

    return (

        <div className="container-fluid bg-footer">
            <div className="row">

                <div className="col align-items-center me-2">
                    <div className="flex-grow-1 ms-3">
                        <h6 className="titles text-center m-0">Contacto</h6>

                        <ul className="list ">
                            <li><Link to="" className="a text-muted">Acerca de Go!</Link></li>
                            <li>San Juan 816, M5500 Mendoza</li>
                            <li>+59 4 261 123456</li>
                            <li><Link to="" className="a text-muted">go_libreria@mail.com</Link></li>
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
                        <div className='input-containter'>
                            <input className='e-mail' placeholder='Ingresa tu e-mail' />
                            <button className='send'>
                            <img className='arrow' src={`${process.env.PUBLIC_URL}/assets/icons/arrow-rigth.png`} alt="arrow" />
                            </button>
                        </div>
                        <ul className="noticias">
                            <li><Link to="/" className="a text-muted">Term & Condiciones</Link></li>
                            <li><Link to="/" className="a text-muted">Politicas</Link></li>
                            <li><Link to="/" className="a text-muted">Ubicacion</Link></li>
                        </ul>


                        <ul className="navigation">
                            <li><a href="https://www.facebook.com/GoArtMendoza" target="_blank" className="logo"><i class="bi bi-facebook" /></a></li>
                            <li><a href="https://www.instagram.com/goart.mza" target="_blank" className="logo"><i class="bi bi-instagram" /></a></li>
                            <li><Link to="" className="logo"><i className="bi bi-youtube" /></Link></li>
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
