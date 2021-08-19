import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getOneArticulo } from '../../redux/actions/articuloActions'
import { addToCart } from '../../redux/actions/cartAction';
import { Navbar } from '../ui/Navbar';

export const Product = (props) => {

    const dispatch = useDispatch();
    const articulo = useSelector(state => state.art.articulos[0])
    const prodId = props.match.params.id;
    const [qty, setQty] = useState(1);

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
                <div className="p-4 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">

                    <div className="row g-0 p-2 position-relative">

                        <div className="col bg d-none d-md-block d-lg-block col-md-5 col-lg-5 col-xl-6 rounded align-items-center">
                            <img src={articulo.url} width="100px" className="img-login" alt="imagen-1"></img>
                        </div>

                        <div className="col p-3 d-flex flex-column position-static">
                            <span className="d-inline-block mb-2 text-primary h5">Articulo</span>
                            <strong className="mb-0 card-title h3">{articulo.nameArticulo}</strong>
                            <br />
                            <p className="mb-1 text-muted"><span className="bg-warning border">RUBRO</span> {articulo.rubros}</p>
                            <span className="h1 card-text">${articulo.precioVenta}</span>
                            <br />
                            <p className="card-text mb-auto">{articulo.description}</p>
                            <br />
                        </div>

                        <div className="col p-4 d-flex flex-column position-static">
                            <div className="card">
                                <div className="card-body">
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

                                        <Link to="/" className="link-danger">Return</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="b-example-divider"></div>
        </>
    )
}
