import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { useMercadopago } from 'react-sdk-mercadopago/lib'
import { useSelector } from 'react-redux'
import { Loading } from '../ui/Loading'
import { Footer } from '../ui/Footer'

export const Checkout = () => {

    const [order] = useSelector(state => state.ord.order)
    const [totalPrice, setTotalPrice] = useState(0)

    const mercadopago = useMercadopago.v2('APP_USR-4b6e62f4-00c0-4ccf-9b62-fb554c988441', {
        locale: 'es-AR'
    });

    useEffect(() => {

        if (mercadopago && order) {
            mercadopago.checkout({
                preference: {
                    id: order.preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar con Mercado Pago',
                }
            })
        }

    }, [mercadopago, order])

    useEffect(() => {
        let price = 0;
        if (order) {
            order.items.forEach((item) => {
                price += item.quantity * item.unit_price;
            });
        }
        setTotalPrice(price);

    }, [totalPrice, setTotalPrice, order])



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

                            {!order ?
                                (
                                    <tbody>
                                        <td colspan="4" className="table-active"><Loading /></td>
                                    </tbody>
                                ) :
                                (

                                    <tbody>
                                        {order.items.map((oi, index) => (
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
                                            <td>${totalPrice}</td>
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
                            <div className="text-center">
                                <div className="cho-container" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
