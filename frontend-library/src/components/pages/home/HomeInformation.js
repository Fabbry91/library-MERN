import React from 'react'
import { Link } from 'react-router-dom'

export const HomeInformation = () => {
    return (
        <>
            <div className="container my-2">

                <div className="row align-items-center p-2">

                    <div className="col d-flex align-items-center border border-warning rounded-2 me-2 mb-1">
                        <div className="flex-shrink-0">
                            <i className="bi bi-credit-card-2-back-fill m-1 me-3 text-primary" style={{ fontSize: 55 }} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="fw-bold m-0">Tarjeta de débito</h6>
                            <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver más...</Link>
                        </div>
                    </div>

                    <div className="col d-flex align-items-center border border-warning rounded-2 me-2 mb-1">
                        <div className="flex-shrink-0">
                            <i className="bi bi-credit-card-2-front-fill m-1 me-2 text-primary" style={{ fontSize: 55 }} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="fw-bold m-0">Tarjeta de crédito</h6>
                            <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver promociones bancarias...</Link>
                        </div>
                    </div>

                    <div className="col d-flex align-items-center border border-warning rounded-2 mb-1s">
                        <div className="flex-shrink-0">
                            <i className="bi bi-cash m-1 me-2 text-primary" style={{ fontSize: 55 }} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h6 className="fw-bold m-0">Pagó en efectivo</h6>
                            <Link to="#" className="h6" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver más...</Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content border border-info rounded-3">
                        <div className="modal-body">

                            <div className="container p-2">
                                <div className="d-flex bd-highlight">
                                    <div className="p-2 w-100 bd-highlight">
                                        <h2 className="fw-bold modal-title">Medios de pagos</h2>
                                    </div>
                                    <div className="p-2 flex-shrink-1 bd-highlight">
                                        <img src={process.env.PUBLIC_URL + "/assets/img/mercado-pago.png"} alt="logo" width="150 px" />
                                    </div>
                                </div>
                                <br />
                                <h4 className="fw-bold">Pagá de la forma que quieras</h4>
                                <span>Podés pagar tus compras con cualquiera de estos medios. Es rápido y seguro, siempre.</span>
                                <br />
                                <br />
                                <br />
                                <br />
                                <h4 className="fw-bold">
                                    <i className="bi bi-credit-card-fill m-1 me-2 text-primary me-1" style={{ fontSize: 20 }} />
                                    Tarjeta de crédito en hasta 6 cuotas
                                </h4>
                                <img src={process.env.PUBLIC_URL + "/assets/img/credito.png"} alt="logo" width="240 px" />
                                <br />
                                <br />
                                <h4 className="fw-bold">
                                    <i className="bi bi-credit-card-2-front-fill m-1 me-2 text-primary me-1" style={{ fontSize: 20 }} />
                                    Tarjeta de débito
                                </h4>
                                <img src={process.env.PUBLIC_URL + "/assets/img/debit.png"} alt="logo" width="150 px" />
                                <br />
                                <br />
                                <h4 className="fw-bold">
                                    <i className="bi bi-cash m-1 me-2 text-primary" style={{ fontSize: 20 }} />
                                    Pago en Efectivo
                                </h4>
                                <img src={process.env.PUBLIC_URL + "/assets/img/pago-facil-rapi-pago.jpg"} alt="logo" width="140 px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
