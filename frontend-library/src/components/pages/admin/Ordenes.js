import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from '../../../redux/actions/orderAction'
import { getAllUser } from '../../../redux/actions/userAction'
import { Loading } from '../../ui/Loading'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Ordenes = () => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.ord.order)
    const user = useSelector(state => state.user.user)
    console.log(order)
    const { loading } = useSelector((state) => state.ui)

    useEffect(() => {
        if (Object.keys(order).length === 0) {
            dispatch(getAllOrder())
        }
    }, [])

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
                                        <h2 className="h2">Ordenes</h2>
                                    </div>
                                    <div className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">

                                    <div className="row row-cols-1 row-cols-md-2 g-4">

                                        {
                                            loading ? (
                                                <div className="position-absolute top-50 start-50 translate-middle">
                                                    <Loading />
                                                </div>
                                            ) : (

                                                <>
                                                    {
                                                        order.map(o => (
                                                            < div className="col" key={o._id}>
                                                                <div className="card border-info text-primary">
                                                                    <div className="card-header text-dark">
                                                                        <div className="row">
                                                                            <div className="col-6">Orden: <span style={{ textTransform: 'uppercase' }}>{o.preferenceId.slice(-3)}</span> </div>
                                                                            <div className="col-6">Fecha: {o.date.slice(0, 10)}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-body text-dark">
                                                                        <span className="card-title">Usuario: {o.user}</span>
                                                                        <br />
                                                                        <br />
                                                                        <ul className="card-text">
                                                                            {
                                                                                o.items.map((oi, index) => (
                                                                                    <li key={index} style={{ textTransform: 'capitalize' }}>Art.: {oi.title}  &nbsp;${oi.unit_price} u.  &nbsp;cant: {oi.quantity} </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                        <div className="row">
                                                                            <span className="col-6">Total: $ {o.total}</span>
                                                                            <span className="col-6" style={{ textTransform: 'capitalize' }}>Estado: {o.status}</span>
                                                                        </div>

                                                                        <div className="text-center mt-2">
                                                                            <button className="btn btn-primary "> ok</button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )}
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
