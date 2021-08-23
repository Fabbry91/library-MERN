import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../ui/Navbar'
import { adjustItemQty, removeFromCart } from '../../redux/actions/cartAction'
import { Order } from './Order'
import { Footer } from '../ui/Footer'

export const ShoppingCart = ({ history }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach((item) => {
            items += item.qty;
            price += item.qty * item.precioVenta;
        });

        setTotalItems(items);
        setTotalPrice(price);

    }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])

    const handleInputChange = (event, id) => {
        dispatch(adjustItemQty(id, event.target.value))
    }

    const deleteCart = (id) => {

        dispatch(removeFromCart(id))
    }


    return (
        <>
            <Navbar />
            <div className="b-example-divider"></div>

            <div className="container my-5">

                <div className="row">


                    {cart.length === 0 ?
                        (
                            <>
                                <div className="col-7 p-3 align-items-center rounded-3 border border-info shadow-lg position-relative">
                                    <span className="h3 text-secondary position-absolute top-50 start-50 translate-middle">Tu carrito está vacío</span>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <ul className="col-7 list-group list-group-flush ">

                                    {(cart.map((item, index) => (

                                        <li className="list-group-item border border-info align-items-center rounded-3 shadow-lg mb-2" key={index}>

                                            <div className="row ">

                                                <div className="col-3">
                                                    <img className="img-fluid fit-image border border-dark rounded-2" src={item.url} alt=".." />
                                                </div>

                                                <div className="col-6">
                                                    <h3 className="bold" style={{ textTransform: 'capitalize' }}>{item.nameArticulo}</h3>
                                                    <br />
                                                    <span className="h3 bold ">
                                                        ${item.qty &&
                                                            (item.precioVenta * item.qty)}</span>

                                                    <hr />
                                                    <div className="row ">
                                                        <div className="col">
                                                            <span className="h6">Precio unitario: </span><span className="text-muted">${item.precioVenta}</span>
                                                        </div>
                                                        <div className="col">
                                                            <span className="h6">{item.stock}</span> <span className="text-muted">disponibles.</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-3 my-3 ">

                                                    <div className="row ">

                                                        <div className="col">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                min="1"
                                                                name="qty"
                                                                value={item.qty}
                                                                onChange={(e) => handleInputChange(e, item._id)}
                                                            />
                                                        </div>

                                                        <div className="col">
                                                            <button className="btn btn-danger" onClick={() => deleteCart(item._id)}>
                                                                <i className="bi bi-trash-fill" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                    )
                                    }
                                </ul>
                            </>)
                    }


                    <div className="col-5">
                        <div className="p-4 align-items-center rounded-3 border art-vendido shadow-lg mb-3">
                            <div className="card-header h5 text-center mb-3"><span className="text-muted">Articulos vendido por</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="strong h4">GO!</span><span className="text-muted" style={{ fontSize: 13 }}>ART</span></div>
                            <br />
                            <div className="row mb-3">
                                <div className="col-6">
                                    <span className="text-muted">Cant. articulos:</span> {totalItems}
                                </div>
                                <div className="col-6">
                                    <span className="text-muted">Total:</span> $ {totalPrice}
                                </div>
                            </div>
                        </div>
                        <Order props={[history, totalPrice]} />
                    </div>

                </div>
            </div>
            <div className="b-example-divider"></div>
            <Footer />
        </>
    )
}
