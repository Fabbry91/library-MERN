import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo } from '../../../redux/actions/articuloActions'
import { getAllOrder } from '../../../redux/actions/orderAction'

export const Statistics = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.ord.order)

    useEffect(() => {
        dispatch(getAllArticulo())
        dispatch(getAllOrder())
    }, [dispatch])

    const or = order.map((or) => {
        const o = { ...or, date: or.date.slice(0, -5).replace('T', ' ') }
        return o
    })
    const o = or.slice(0, 3).sort(o => o.date).reverse()

    return (
        <div className="container-fluid mt-2">

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
                        {o.map((f, index) => (
                            <tr key={index}>
                                <th style={{ textTransform: 'capitalize' }}>
                                    <h6 className="h6 d-flex justify-content-between">
                                        <span className="badge rounded-pill bg-success" style={{ textTransform: 'uppercase' }}>{f.preferenceId?.slice(-3)}</span> <span className="text-muted">{f.date?.slice(10, 19)} hs</span>
                                    </h6>
                                    <span className="text-muted text-center">Fecha:{f.date?.slice(0, 10)}</span>
                                </th>
                                <td >
                                    <h6 className="h6">{f.user}</h6>
                                </td>
                                <td>
                                    <h6 className="h6 text-center">
                                        <span className="fw-bold">$ {f.total}</span>
                                    </h6>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
