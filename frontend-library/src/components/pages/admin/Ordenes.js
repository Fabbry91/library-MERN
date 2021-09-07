import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from "react-js-pagination"
import SearchField from "react-search-field"

import { startAddFactura } from '../../../redux/actions/facturasAction'
import { getAllOrder } from '../../../redux/actions/orderAction'
import { Loading } from '../../ui/Loading'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Ordenes = () => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.ord.order)
    const { loading } = useSelector((state) => state.ui)

    const [verSerch, setVerSerch] = useState(false);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    //Paginación
    const orderXpag = 6;
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastOrder = activePage * orderXpag;
    const indexOfFirstOrd = indexOfLastOrder - orderXpag;
    const currentOrd = order.slice(indexOfFirstOrd, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const handleOrder = (orden) => {
        dispatch(startAddFactura(orden))
    }

    const onChangeHandler = (valor, e) => {

        if (valor === '') {
            setVerSerch(false)
        } else {
            const result = order.filter((post) => {
                const postName = post.user.toLowerCase();
                return postName.includes(valor)
            })
            setSearch(result)
            setVerSerch(true)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Dashboard />

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <h2 className="h2">Ordenes</h2>
                                    </div>
                                    <div className="d-flex">
                                        <SearchField
                                            placeholder="Buscar..."
                                            onChange={onChangeHandler}
                                        />
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
                                                    {verSerch === false ?
                                                        (currentOrd.map(o => (
                                                            < div className="col" key={o._id}>
                                                                {o.statusFactura === 'sin facturar' ?
                                                                    (<>
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
                                                                                    <button type="button" className="btn btn-primary" onClick={() => handleOrder(o)}> ok</button>
                                                                                </div>

                                                                                {o.status === 'approved' ?
                                                                                    (<div className="text-center mt-2">
                                                                                        <button type="button" className="btn btn-primary" onClick={() => handleOrder(o)}> ok</button>
                                                                                    </div>) :
                                                                                    (
                                                                                        <div className="text-center mt-2">
                                                                                            <button type="button" className="btn btn-primary" disabled> ok</button>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                    ) : (
                                                                        <p>No hay elementos a facturar</p>
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                        ) :
                                                        (
                                                            search.length <= 0 ?
                                                                (
                                                                    <div className="position-relative">
                                                                        <div className="position-absolute top-50 start-50 translate-middle">
                                                                            No existe Orden para ese usuario.
                                                                        </div>
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    search.map(o => (
                                                                        < div className="col" key={o._id}>
                                                                            {o.statusFactura === 'sin facturar' ?
                                                                                (<>
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

                                                                                            {o.status === 'approved' ?
                                                                                                (<div className="text-center mt-2">
                                                                                                    <button type="button" className="btn btn-primary" onClick={() => handleOrder(o)}> ok</button>
                                                                                                </div>) :
                                                                                                (
                                                                                                    <div className="text-center mt-2">
                                                                                                        <button type="button" className="btn btn-primary" disabled> ok</button>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        </div>

                                                                                    </div>
                                                                                </>
                                                                                ) : (
                                                                                    <p>No hay elementos a facturar</p>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    ))
                                                                )
                                                        )
                                                    }
                                                </>
                                            )}
                                    </div>

                                    <div className="pagination justify-content-center mt-2">
                                        <Pagination
                                            itemclassName="page-item"
                                            linkclassName="page-link"
                                            activePage={activePage}
                                            itemsCountPerPage={6}
                                            totalItemsCount={order.length}
                                            pageRangeDisplayed={6}
                                            onChange={handlePageChange}
                                        />
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
