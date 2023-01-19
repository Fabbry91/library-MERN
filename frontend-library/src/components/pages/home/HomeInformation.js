import React from 'react'
import { Link } from 'react-router-dom'

export const HomeInformation = () => {
    return (
        <>
            <div className="container my-2">

                <div className="row align-items-center p-2">

                    <div className="col border-card-banner">
                        <div className='box-info'>
                            <div className="info-left flex">
                                <h4 className="m-0" style={{ fontWeight: 500 }}>Productos Destacados</h4>
                                <p style={{fontSize:'14px', fontWeight:400, color:'#646464'}}>Resaltadores, lapices y colores</p>
                                <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver más...</Link>
                            </div>
                            <div className="info-rigth flex-grow">
                                <img className='img-banner' src={`${process.env.PUBLIC_URL}/assets/img/pens.png`} alt="user" />
                            </div>
                        </div>
                    </div>

                    <div className="col border-card-banner">
                        <div className='box-info'>
                            <div className="info-left flex">
                                <h4 className="m-0" style={{ fontWeight: 500 }}>Nueva Colección</h4>
                                <p style={{fontSize:'14px', fontWeight:400, color:'#646464'}}>Adhesivos y pegamentos</p>
                                <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver más...</Link>
                            </div>
                            <div className="info-rigth flex-grow">
                                <img className='img-banner' src={`${process.env.PUBLIC_URL}/assets/img/glues.png`} alt="user" />
                            </div>
                        </div>
                    </div>

                    <div className="col border-card-banner d-flex">
                        <div className='box-info'>
                            <div className="info-left flex">
                                <h4 className="m-0" style={{ fontWeight: 500 }}>Productos Traiding</h4>
                                <p style={{fontSize:'14px', fontWeight:400, color:'#646464'}}>Pintureria</p>
                                <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver más...</Link>
                            </div>
                            <div className="info-rigth flex-grow">
                                <img className='img-banner' src={`${process.env.PUBLIC_URL}/assets/img/paints.png`} alt="user" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
