import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteOrder } from '../../../redux/actions/orderAction'
import Pagination from "react-js-pagination"
import { Loading } from '../../ui/Loading'

export const ViewOrder = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.ui)
    const order = useSelector(state => state.ord.order)

    //Paginación
    const orderXpag = 7;
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastOrder = activePage * orderXpag;
    const indexOfFirstOrd = indexOfLastOrder - orderXpag;
    const currentOrd = order.slice(indexOfFirstOrd, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const [preference, setPreference] = useState({})

    const hadleDeleteOrder = (id, user) => {
        dispatch(startDeleteOrder(id, user))
    }

    return (
        <>
            <div className="p-3  p-2 align-items-center rounded-3 border border-info shadow-lg">
                <div className="d-flex bd-highlight">
                    <div className="p-2 w-100 bd-highlight">
                        <h4 className="fw-bold modal-title">Mis Compras</h4>
                    </div>
                    <div className="p-2 flex-shrink-1 bd-highlight">
                        <img src={process.env.PUBLIC_URL + "/assets/img/go.png"} alt="logo" width="80 px" />
                    </div>
                </div>
                <br />
                <h5 className="fw-bold">Compras realizadas</h5>
                <br />
                {loading ?
                    (<Loading />) : (
                        <>
                            {order.length <= 0 ?

                                (<div className="text-center text-muted">
                                    Usted no ha realizado compras!
                                </div>)
                                :

                                (
                                    <ul className="list-group mt-2">
                                        {
                                            (currentOrd.map((ord) => (
                                                <div key={ord._id}>
                                                    {ord.status !== "approved" ?
                                                        (<li className="list-group-item d-flex justify-content-between align-items-start">
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">Orden: <span style={{ textTransform: 'uppercase' }}>{ord.preferenceId.slice(-3)}</span> </div>
                                                                <span>Fecha: {ord.date.slice(0, 10)}</span> &nbsp;&nbsp;
                                                                <span>Total: <span className="fw-bold">$ {ord.total}</span></span>
                                                            </div>
                                                            <span className="badge bg-warning text-dark me-1 rounded-pill">{ord.status}</span>
                                                            <button className="btn btn-sm btn-danger me-1"><i className="bi bi-trash-fill" onClick={(() => hadleDeleteOrder(ord._id, ord.user))} /></button>
                                                            <Link to={{ pathname: "/viewPay", state: { preferenceId: `${ord.preferenceId}` } }} className="btn btn-success btn-sm"><i className="bi bi-currency-dollar" /></Link>
                                                        </li>) :
                                                        (<li className="list-group-item d-flex justify-content-between align-items-start ">
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">Orden: <span style={{ textTransform: 'uppercase' }}>{ord.preferenceId.slice(-3)}</span> </div>
                                                                <span>Fecha: {ord.date.slice(0, 10)}</span> &nbsp;&nbsp;
                                                                <span>Total: <span className="fw-bold">$ {ord.total}</span></span>
                                                            </div>
                                                            <span className="badge bg-success me-1 rounded-pill">Aprobada</span>
                                                            <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setPreference(ord)}><i className="bi bi-eye" style={{ fontSize: 20 }} /></button>
                                                        </li>)

                                                    }
                                                </div>

                                            )))
                                        }
                                    </ul>
                                )
                            }
                        </>
                    )
                }

                <div className="pagination justify-content-center mt-2">
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={activePage}
                        itemsCountPerPage={7}
                        totalItemsCount={order.length}
                        pageRangeDisplayed={7}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-2 border-info">
                        <div className="modal-header">
                            <div className="container">
                                <div className="row">
                                    <div className="h5 col-6">Orden:<span className="badge bg-success" style={{ textTransform: 'uppercase' }}>{preference.preferenceId?.slice(-3)}</span></div>
                                    <div className="col-6">
                                        <span className="col-6">Fecha: {preference.date?.slice(0, 10)}</span>
                                    </div>
                                </div>
                            </div>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="col-12 fw-bold text-center mb-3">{preference.user}</div>
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

                                    {!preference ?
                                        (
                                            <tbody>
                                                <td colSpan={4} className="table-active"><Loading /></td>
                                            </tbody>
                                        ) :
                                        (

                                            <tbody>
                                                {preference.items?.map((oi) => (
                                                    <tr key={oi._id}>
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
                                                    <td>${preference.total}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {preference.status === "approved" ?
                                (<button type="button" className="btn btn-success" data-bs-dismiss="modal" >Pagado</button>)
                                :
                                (<Link to={{ pathname: "/viewPay", state: { prefernceId: `${preference.preferenceId}` } }} type="button" className="btn btn-info text-light">Pagar</Link>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
