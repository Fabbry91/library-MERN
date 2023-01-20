import React from 'react'
import { Link } from 'react-router-dom'

export const HomeBanner = () => {

    return (
        <div className='banner'>
            <div className='container-text'>
                <div className='text-box'>
                    <div className='title-banner'>
                        ¿Te gustaría conocer los articulos que tenemos para ofrecerte?
                    </div>
                    <p>
                        Busca entre millones de productos de librería. Nuestro servicio te ayuda a encontrar la mejor oferta del mercado.
                    </p>
                    <Link to="/login" className="btn-ingresar" >
                        <span className='btn-ingresar-text'>Ingresar</span>
                    </Link>
                </div>
            </div>
            <div className='container-imagen'>
                <img className='img-banner' src={`${process.env.PUBLIC_URL}/assets/img/banner-01.jpg`} alt="user" />
            </div>
        </div>

    )
}
