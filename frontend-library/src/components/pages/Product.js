import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { getOneArticulo } from '../../redux/actions/articuloActions'
import { addToCart } from '../../redux/actions/cartAction';
import { Footer } from '../ui/Footer';
import { Loading } from '../ui/Loading';
import { Navbar } from '../ui/Navbar';

export const Product = (props) => {

    const dispatch = useDispatch();
    const articulo = useSelector(state => state.art.articulos[0])
    const { loading, msgError } = useSelector((state) => state.ui)
    const prodId = props.match.params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getOneArticulo(prodId))
    }, [prodId, dispatch])

    const addToCartHandler = (id) => {
        dispatch(addToCart(id))
        //console.log(id)
    }

    return (

        <>
            <Navbar />
            <div className="b-example-divider"></div>
            <div className="container my-5">
                <div className="p-2 align-items-center rounded-3 border border-info shadow-lg">

                    <div className="row">

                        <div className="col-lg-4 ms-3 d-none d-sm-block position-relative">
                            {loading ? (
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <Loading />
                                </div>
                            ) : (
                                <img src={articulo.url} className="img-fluid fit-image border border-dark rounded-2" alt="imagen-1"></img>
                            )}
                        </div>

                        <div className="col-lg-5 p-3 d-flex flex-column position-static">
                            <span className="d-inline-block mb-2 text-primary h6">Articulo</span>
                            <strong className="mb-0 card-title h3" style={{ textTransform: 'capitalize' }}>{articulo.nameArticulo}</strong>
                            <br />
                            <p className="mb-1 text-muted"><span className="badge rounded-pill bg-success"> {articulo.rubros}</span></p>
                            <br />
                            <span className="h1 card-text price">${articulo.precioVenta}</span>
                        </div>

                        <div className="col p-3 me-3 d-flex flex-column border border-info rounded-3">
                            <p><span className="text-muted h5">Vendido por </span><strong className="card-text">GO</strong>.</p>
                            <br />
                            <strong className="card-text h-5">Stock disponible </strong><span className="text-muted">{articulo.stock} un.</span>
                            <br />
                            <div className="d-grid gap-2 mt-3">

                                {
                                    articulo.stock <= 0
                                        ? (<button className="btn btn-secondary btn-sm" type="button" disable >Sin Stock</button>)
                                        : (
                                            <>
                                                <Link to={`/shopping-cart/${articulo._id}`} className="btn btn-sm btn-primary" onClick={() => addToCartHandler(articulo._id)}>Comprar</Link>
                                                <button className="btn btn-outline-primary btn-sm" type="button" disable onClick={() => addToCartHandler(articulo._id)}>Agregar al carrito</button>
                                            </>
                                        )

                                }
                                <Link to="/" className="btn btn-sm text-danger">
                                    <i className="bi bi-caret-left-fill" />
                                    Regresar</Link>

                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-8 p-4 align-items-center rounded-3 border border-info shadow-lg position-relative">
                        <h4 className="fw-bold modal-title">Detalles de productos.</h4>
                        <br />
                        {articulo.description !== "" ?
                            (<span className="h5 text-muted">{articulo.description}</span>) :
                            (<span className="h2 text-muted center-text">No tiene descripción.</span>)
                        }

                    </div>

                    <div className="col-4">
                        <div className="p-3  p-2 align-items-center rounded-3 border border-info shadow-lg">
                            <div className="d-flex bd-highlight">
                                <div className="p-2 w-100 bd-highlight">
                                    <h4 className="fw-bold modal-title">Medios de pagos</h4>
                                </div>
                                <div className="p-2 flex-shrink-1 bd-highlight">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/mercado-pago.png"} alt="logo" width="120 px" />
                                </div>
                            </div>
                            <br />
                            <h5 className="fw-bold">Pagá de la forma que quieras</h5>
                            <span>Podés pagar tus compras con cualquiera de estos medios. Es rápido y seguro, siempre.</span>
                            <br />
                            <br />
                            <h6 className="fw-bold">
                                <i className="bi bi-credit-card-fill m-1 me-2 text-primary me-1" style={{ fontSize: 18 }} />
                                Tarjeta de crédito en hasta 6 cuotas
                            </h6>
                            <img src={process.env.PUBLIC_URL + "/assets/img/credito.png"} alt="logo" width="200 px" />
                            <br />
                            <br />
                            <h6 className="fw-bold">
                                <i className="bi bi-credit-card-2-front-fill m-1 me-2 text-primary me-1" style={{ fontSize: 18 }} />
                                Tarjeta de débito
                            </h6>
                            <img src={process.env.PUBLIC_URL + "/assets/img/debit.png"} alt="logo" width="130 px" />
                            <br />
                            <br />
                            <h6 className="fw-bold">
                                <i className="bi bi-cash m-1 me-2 text-primary" style={{ fontSize: 18 }} />
                                Pago en Efectivo
                            </h6>
                            <img src={process.env.PUBLIC_URL + "/assets/img/pago-facil-rapi-pago.jpg"} alt="logo" width="100 px" />

                        </div>
                    </div>
                </div>
            </div>
            <div className="b-example-divider"></div>
            <Footer />
        </>
    )
}
