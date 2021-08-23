import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'

export const Error404 = () => {
    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="col-12 rounded-3 border border-info shadow-lg position-relative">
                    <img src={process.env.PUBLIC_URL + "/assets/img/404.png"} className="img-fluid error404" alt="imagen-1" />
                    <div className="h2 text-center fw-bold position-absolute bottom-0 start-50 translate-middle-x">
                    <span className="h2 fw-bold">Oh esta pagina no existe!!!</span>
                    <br/>
                    <span className="badge rounded-pill bg-light text-dark" style={{fontSize:17}}>Quizás la búsqueda pueda ayudar o volver a la página de <Link to="/">inicio</Link></span>
                    </div>                    
                    
                </div>
            </div>
        </>
    )
}
