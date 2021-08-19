import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { addToCart } from '../../redux/actions/cartAction';

export const Products = (props) => {

    const dispatch = useDispatch();

    const { product } = props;

    const addToCartHandler = (id) => {
        dispatch(addToCart(id))
    }

    return (

        <div className="col" key={product._id}>
            <div className="card shadow-sm">
                <Link to={`/producto/${product._id}`}>
                    <img src={product.url} className="bd-placeholder-img card-img-top" width="100%" height="225" alt=""/>
                </Link>
                <div className="card-body">
                    <h2>{product.nameArticulo}</h2>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/producto/${product._id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                            {
                                product.stock <= 0
                                    ? (<span className="btn btn-sm btn-outline-secondary" disable >Sin Stock</span>)
                                    : (
                                        <>
                                            <Link to={`/shopping-cart/${product._id}`} className="btn btn-sm btn-outline-primary" onClick={() => addToCartHandler(product._id)}>Comprar</Link>
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addToCartHandler(product._id)}>Add</button>
                                        </>
                                    )

                            }
                        </div>
                        <span className="">${product.precioVenta}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

