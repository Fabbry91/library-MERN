import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo } from '../../../redux/actions/articuloActions'
import { getAllOrder } from '../../../redux/actions/orderAction'

export const Statistics = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.ord.order)
    const facturas = useSelector((state) => state.fact.facturas)

    useEffect(() => {
        dispatch(getAllArticulo())
        dispatch(getAllOrder())
    }, [dispatch])

    const or = order.map((or) => {
        const o = { ...or, date: or.date.slice(0, -5).replace('T', ' ') }
        return o
    })

    const itemsProd = facturas?.map((pr) =>
        pr.pedido?.items
    )

    const itemProd = itemsProd => itemsProd.reduce((acc, p) => acc.concat(p), []);
    const prods = itemProd(itemsProd)

    const prod = prods.map((or) => {
        const o = {
            product: or?.product,
            quantity: or?.quantity,
            title: or?.title,
        }
        return o
    })

    const artSduplicate = prod.reduce((acc, valorAcr) => {

        const existe = acc.find(e => e.product === valorAcr.product);

        if (existe) {

            return acc.map((e) => {
                if (e.product === valorAcr.product) {
                    return {
                        quantity: e.quantity + valorAcr.quantity,
                        title: e.title,
                    }
                }

                return e;
            });
        }

        return [...acc, valorAcr]
    }, []);


    const arts = artSduplicate.sort((a, b) => a.quantity - b.quantity).reverse()
    const p = arts.slice(0, 5)
    const o = or.slice(0, 3).sort(o => o.date).reverse()
   // console.log(p)


    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-md-12 col-6 ">
                    <h5 className="fw-bold mb-3">Más Vendidos</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered border-primary">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">ORDER </th>
                                    <th scope="col">PRODUCTO</th>
                                    <th scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td >
                                    <h6 className="h6">
                                    </h6>
                                </td>
                                {/*p &&
                                    p.map((prod, index) => (
                                        <tr key={index}>
                                            <td style={{ textTransform: 'capitalize' }}>
                                                <h6 className="h6 d-flex justify-content-between">
                                                    <span className="badge rounded-pill bg-success" style={{ textTransform: 'uppercase' }}>{prod.preferenceId?.slice(-3)}</span> <span className="text-muted">{prod.date?.slice(10, 19)} hs</span>
                                                </h6>
                                                <span className="text-muted text-center">Fecha:{prod.date?.slice(0, 10)}</span>
                                            </td>
                                            <td >
                                                <h6 className="h6">
                                                    {prod.user}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6 className="h6 text-center">
                                                    <span className="fw-bold"> $ {prod.total} </span>
                                                </h6>
                                            </td>
                                        </tr>
                                    ))
                                    */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-12 col-6">
                    <h5 className="fw-bold mb-3">Ordenes Recientes</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered border-primary">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">ORDER </th>
                                    <th scope="col">PRODUCTO</th>
                                    <th scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {o &&
                                    o.map((f, index) => (
                                        <tr key={index}>
                                            <td style={{ textTransform: 'capitalize' }}>
                                                <h6 className="h6 d-flex justify-content-between">
                                                    <span className="badge rounded-pill bg-success" style={{ textTransform: 'uppercase' }}>{f.preferenceId?.slice(-3)}</span> <span className="text-muted">{f.date?.slice(10, 19)} hs</span>
                                                </h6>
                                                <span className="text-muted text-center">Fecha:{f.date?.slice(0, 10)}</span>
                                            </td>
                                            <td >
                                                <h6 className="h6">
                                                    {f.user}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6 className="h6 text-center">
                                                    <span className="fw-bold"> $ {f.total} </span>
                                                </h6>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
