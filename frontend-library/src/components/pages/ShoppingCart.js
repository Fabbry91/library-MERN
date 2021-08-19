import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Loading } from '../ui/Loading'
import { Navbar } from '../ui/Navbar'
import { adjustItemQty, removeFromCart } from '../../redux/actions/cartAction'
import { useMercadopago } from 'react-sdk-mercadopago';
import { Link, Redirect } from 'react-router-dom'
import { Order } from './Order'

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

            <div className="container my-5">

                <div className="row">

                    <div className="col-7 p-3 align-items-center rounded-3 border shadow-lg">
                        <ul className="list-group list-group-flush">
                            {cart.length === 0 ?
                                (<li className="list-group-item text-center">
                                    <span className="h3 text-secondary">Tu carrito está vacío</span> </li>)

                                : (cart.map((item, index) => (

                                    <li className="list-group-item" key={index}>

                                        <div className="row ">

                                            <div className="col-3">
                                                <img src={item.url} width="150px" alt=".." />
                                            </div>

                                            <div className="col-6">
                                                <h3 className="bold ">{item.nameArticulo}</h3>
                                                <br />
                                                <span className="h3 bold ">
                                                    ${item.qty &&
                                                        (item.precioVenta * item.qty)}</span>

                                                <hr />
                                                <div className="row">
                                                    <div className="col">
                                                        <span className="h6">Precio unitario: </span><span className="text-muted">${item.precioVenta}</span>
                                                    </div>
                                                    <div className="col">
                                                        <span className="h6">{item.stock}</span> <span className="text-muted">disponibles.</span>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-2">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min="1"
                                                    name="qty"
                                                    value={item.qty}
                                                    onChange={(e) => handleInputChange(e, item._id)}
                                                />

                                            </div>

                                            <div className="col-1">
                                                <button className="btn btn-danger" onClick={() => deleteCart(item._id)}>X</button>
                                            </div>

                                        </div>
                                    </li>
                                ))
                                )
                            }
                        </ul>
                    </div>

                    <div className="col-5">
                        <div className="p-3 align-items-center rounded-3 border shadow-lg mb-3">
                            <div className="card-header h5 text-center mb-3"><span className="text-muted">Articulos vendido por</span> <span className="strong h4">GO!</span></div>
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <span className="text-muted">Cant. articulos:</span> {totalItems}
                                </div>
                                <div className="col-6">
                                    <span className="text-muted">Total:</span> $ {totalPrice}
                                </div>
                            </div>
                        </div>
                        <Order props={history} />
                    </div>

                </div>
            </div>
        </>
    )
}
