import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart } from '../../../redux/actions/cartAction';

export const Products = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth)

    const { product } = props;

    const addToCartHandler = (id) => {
        dispatch(addToCart(id))
    }

    return (

        <div className="col" key={product._id}>
            <div className="card border-info border shadow-lg">
                <Link to={`/producto/${product._id}`}>
                    <img src={product.url} className="bd-placeholder-img card-img-top border " width="100%" height="225" alt="" />
                </Link>
                <div className="card-body">
                    <h4 className="mb-2" >$ {product.precioVenta}</h4>
                    <span className="badge rounded-pill bg-success">{product.rubros}</span>
                    <h4 className="mt-2" style={{ textTransform: 'capitalize' }}>{product.nameArticulo}</h4>

                    <div className="text-center">
                        <div className="row">
                            <div className="col">
                                <Link to={`/producto/${product._id}`} >
                                    <i className="bi bi-eye-fill" style={{ fontSize: 19 }} /> &nbsp;
                                    Ver más
                                </Link>
                            </div>
                            <div className="col">
                                {
                                    product.stock <= 0
                                        ? (<span className="btn btn-sm btn-outline-secondary" disabled >Sin Stock</span>)
                                        : (
                                        <>
                                            {
                                                Object.keys(user).length !== 0 ?
                                                    (<>
                                                        <Link to="#" onClick={() => addToCartHandler(product._id)}>
                                                            <i className="bi bi-cart3" style={{ fontSize: 21 }}></i>
                                                            <i className="bi bi-plus-circle-fill" style={{ fontSize: 22 }}></i></Link>

                                                    </>
                                                    ) : (
                                                        <>
                                                            <Link to="/login">
                                                                <i className="bi bi-cart3" style={{ fontSize: 21 }}></i>
                                                                <i className="bi bi-plus-circle-fill" style={{ fontSize: 22 }}></i></Link>
                                                        </>
                                                    )
                                            }
                                        </>
                                        )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

