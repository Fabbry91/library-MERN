import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFacturas, setOneFactura } from '../../../redux/actions/facturasAction'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Facturacion = () => {

    const dispatch = useDispatch();
    const facturas = useSelector(state => state.fact.facturas)
    const [totalPrice, setTotalPrice] = useState()
    const [oneFact, setOneFact] = useState({})
    const { loading } = useSelector((state) => state.ui)

    useEffect(() => {
        if (Object.keys(facturas).length === 0) {
            dispatch(getAllFacturas())
        }
    }, [facturas])

    useEffect(() => {
        let totals = 0
        facturas.forEach(fact => {
            totals += fact.total
        });
        setTotalPrice(totals)
    }, [totalPrice, setTotalPrice])

    const handleFactura = (id) => {
        const factura = facturas.find((f) => f._id === id);
        setOneFact(factura)
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <Dashboard />

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <h2 className="h2">Facturación</h2>
                                    </div>
                                    <div className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">
                                    <table className="table table-info table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">N° Factura</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Factura</th>
                                                <th scope="col">Subtotales</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {facturas &&
                                                facturas.map((f, index) => (
                                                    <tr key={index}>
                                                        <td style={{ textTransform: 'capitalize' }}>{f.numero}</td>
                                                        <td >{f.fecha.slice(0, 10)}</td>
                                                        <td>
                                                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => handleFactura(f._id)}>
                                                                <i class="bi bi-person-fill" />
                                                                <i class="bi bi-printer-fill" />
                                                            </button>
                                                        </td>
                                                        <td >$ {f.total}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>Total</td>
                                                <td>${totalPrice}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div class="collapse" id="collapseExample">
                                        <div class="container">
                                            <div class="card">
                                                <div class="card-header bg-warning"></div>
                                                <div class="card card-body">
                                                    <div class="div">
                                                        <div class="row mb-3">
                                                            <div class="col">
                                                                <h3 class="fw-bold">
                                                                    <img src={process.env.PUBLIC_URL + "/assets/img/go.png"} width="70" class="img-fluid" alt="" /> &nbsp;&nbsp;&nbsp;Go Art
                                                                </h3>
                                                                <br />
                                                                <span class="h6 fw-bold">Ciudad de Mendoza &nbsp; CP:5530
                                                                    <br />
                                                                    Telefono:(261)4251095
                                                                </span>
                                                            </div>

                                                            <div class="col-md-auto"><span class="h2">X</span></div>

                                                            <div class="col">
                                                                <h5 class="fw-bold">Factura N°: {oneFact.numero} </h5>
                                                                <h5 class="fw-bold">Fecha: {oneFact.fecha?.slice(0, 10)} </h5>
                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col text-left">
                                                                <span className="text-muted">Cliente:</span> <span class="card-text fw-bold">{oneFact.user?.nombre} {oneFact.user?.apellido}</span>
                                                                <br />
                                                                <span className="text-muted">Email:</span> <span class="card-text fw-bold">{oneFact.user?.email}</span>
                                                                <br />
                                                                <span className="text-muted">Contacto:</span> <span class="card-text fw-bold">{oneFact.user?.telefono}</span>
                                                            </div>
                                                            <div class="col">
                                                                <span className="text-muted">Domicilio:</span> <span class="card-text fw-bold">{oneFact.user?.domicilio?.calle}</span>
                                                                <br />
                                                                <span className="text-muted">N°:</span> <span class="card-text fw-bold">{oneFact.user?.domicilio?.numero}</span> <span className="text-muted ms-2">CP:</span> <span class="card-text fw-bold">{oneFact.user?.domicilio?.cp}</span>
                                                                <br />
                                                                <span className="text-muted">Localidad:</span> <span class="card-text fw-bold">{oneFact.user?.domicilio?.localidad}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class=" table-responsive mt-3">
                                                        <div class="div" id='table'>
                                                            <table class="table table-info table-striped text-center">
                                                                <thead class="thead-dark">
                                                                    <tr>
                                                                        <th scope="col">Articulo</th>
                                                                        <th scope="col">Precio Unitario</th>
                                                                        <th scope="col">Cantidad</th>
                                                                        <th scope="col">Subtotal</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {oneFact?.pedido &&
                                                                        oneFact?.pedido?.items.map((p, index) => (
                                                                            <tr key={index}>
                                                                                <td style={{ textTransform: 'capitalize' }}>{p.title}</td>
                                                                                <td >{p.unit_price}</td>
                                                                                <td >{p.quantity}</td>
                                                                                <td >{p.quantity * p.unit_price}</td>
                                                                            </tr>
                                                                        )
                                                                        )

                                                                    }
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td>Total</td>
                                                                        <td>${oneFact.total}</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                        <div class="col-12 text-center">
                                                            <span className="text-muted">Orden:</span> <span class="card-text fw-bold">{oneFact.pedido?.preferenceId.slice(-3)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg-4">
                                    <AboutGo />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
