import React, { useEffect } from 'react'
import { Navbar } from '../../ui/Navbar'
import { useMercadopago } from 'react-sdk-mercadopago/lib'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../ui/Loading'
import { useLocation } from 'react-router-dom'
import { startDeleteOrder } from '../../../redux/actions/orderAction'

export const ViewPay = ({ history }) => {

    const dispatch = useDispatch()
    const { state } = useLocation();
    const { preferenceId } = state

    const order = useSelector(state => state.ord.order)

    const mercadopago = useMercadopago.v2('APP_USR-4b6e62f4-00c0-4ccf-9b62-fb554c988441', {
        locale: 'es-AR'
    });

    const oneOrder = order.find((o) => o.preferenceId === preferenceId)

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

    const hadleDeleteOrder = (id, user) => {
        dispatch(startDeleteOrder(id, user))
        return history.replace("/user")
    }


    return (
        <>
            <Navbar />
            <div className="b-example-divider"></div>

            <div className="container my-5">

                <div className="row">

                    <div className="col-12 col-md-7 p-3 align-items-center rounded-3 border border-info shadow-lg mb-3">

                        {oneOrder &&
                            <>
                                <div className="card-header d-flex justify-content-between">
                                    <h5 className="text-center"> Orden de Pago</h5>
                                    <button type="button" className="btn btn-md btn-danger me-1"
                                        onClick={(() => hadleDeleteOrder(oneOrder._id, oneOrder.user))} >
                                        <i className="bi bi-trash-fill" />
                                    </button>

                                </div>
                                <br />
                                <div className="table-responsive">
                                    <table className="table table-info table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Articulo</th>
                                                <th scope="col">Precio Unitario</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Subtotal</th>
                                            </tr>
                                        </thead>

                                        {!oneOrder?.items < 0 ?
                                            (
                                                <tbody>
                                                    <td colSpan={6} className="table-active"><Loading /></td>
                                                </tbody>
                                            ) :
                                            (

                                                <tbody>
                                                    {oneOrder?.items.map((oi, index) => (
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
                                                        <td className="fw-bold">Total:</td>
                                                        <td className="fw-bold">${oneOrder.total}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }
                                    </table>
                                </div>
                            </>
                        }

                    </div>

                    <div className="col-12 col-md-5">
                        <div className="p-3 align-items-center rounded-3 border border-warning shadow-lg">
                            <div className="card-header h5 text-center">
                                <span className="text-muted">Articulos vendido por</span>
                                <span className="strong h4">GO!</span>
                            </div>
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