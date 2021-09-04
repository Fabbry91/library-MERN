import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Navbar } from '../../ui/Navbar'
import { useLocation } from 'react-router-dom'
import { useMercadopago } from 'react-sdk-mercadopago/lib'

import { Loading } from '../../ui/Loading'

export const Checkout = () => {

    const order = useSelector(state => state.ord.order)
    const { state } = useLocation();
    const { preferenceId } = state

    const orden = order.find((o) => o.preferenceId === preferenceId)

    const mercadopago = useMercadopago.v2('APP_USR-4b6e62f4-00c0-4ccf-9b62-fb554c988441', {
        locale: 'es-AR'
    });

    useEffect(() => {

        if (mercadopago) {
            mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar con Mercado Pago',
                }
            })
        }

    }, [mercadopago, preferenceId])


    return (
        <>
            <Navbar />
            <div className="b-example-divider"></div>

            <div className="container my-5">

                <div className="row">

                    <div className="col-7 p-3 align-items-center rounded-3 border border-info shadow-lg">
                        <div className="card-header h5 text-center"><span className="">Orden de Pago</span></div>
                        <br />
                        <table className="table table-info table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Articulo</th>
                                    <th scope="col">Precio Unitario</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>

                            {!orden?.items ?
                                (
                                    <tbody>
                                        <td colspan="4" className="table-active"><Loading /></td>
                                    </tbody>
                                ) :
                                (

                                    <tbody>
                                        {orden?.items.map((oi, index) => (
                                            <tr key={index}>
                                                <td style={{ textTransform: 'capitalize' }}>{oi.title}</td>
                                                <td>${oi.unit_price}</td>
                                                <td>{oi.quantity} un</td>
                                                <td>${oi.quantity * oi.unit_price}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>${orden?.total}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        </table>
                    </div>

                    <div className="col-5">
                        <div className="p-3 align-items-center rounded-3 border border-warning shadow-lg">
                            <div className="card-header h5 text-center"><span className="text-muted">Articulos vendido por</span> <span className="strong h4">GO!</span></div>
                            <br />
                            {<div className="text-center">
                                <div className="cho-container" />
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
