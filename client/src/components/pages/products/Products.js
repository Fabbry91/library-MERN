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
            <div className="card card-products border">
                <Link to={`/producto/${product._id}`}>
                    <div className='prod-img'>
                        <img src={product.url} alt="" />
                    </div>
                </Link>
                <div className="body-card">
                    <div className='box-price'>
                        <span className="price" >$ {product.precioVenta}</span>
                        <span className="badge rounded-pill">{product.rubros}</span>
                    </div>
                    <h4 className="mt-2" style={{ textTransform: 'capitalize' }}>{product.nameArticulo}</h4>

                    <div className="text-center">
                        <div className="footer-card">
                            <div className="col">
                                <Link className='ver-mas' to={`/producto/${product._id}`} >
                                    <span className='ver-mas-text' style={{ fontSize: '30px',marginRight:'5px' }}>
                                        +
                                    </span>
                                    <span className='ver-mas-text'>
                                        ver más
                                    </span>
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
                                                            <Link className='link-card' to="#" onClick={() => addToCartHandler(product._id)}>
                                                                <img className='img-header' style={{ width: '28px', height: '28px' }} src={`${process.env.PUBLIC_URL}/assets/icons/add-cart.png`} alt="cart" />
                                                            </Link>

                                                        </>
                                                        ) : (
                                                            <>
                                                                <Link className='link-card' to="/login">
                                                                    <img className='img-header' style={{ width: '28px', height: '28px' }} src={`${process.env.PUBLIC_URL}/assets/icons/add-cart.png`} alt="cart" />
                                                                </Link>
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

