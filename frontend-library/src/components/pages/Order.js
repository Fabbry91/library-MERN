import axios from '../../services/AxiosConection'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { startAddOrder } from '../../redux/actions/orderAction'

export const Order = (prop) => {

    const { props } = prop

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const emailUser = useSelector(state => state.auth.email)

    const [userId, setUserId] = useState("")
    const [mostrar, setMostrar] = useState(false)

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`user/email/${emailUser}`);
            precarga(data)
            //console.log(data)
        }
        getUser()
    }, [])

    const onSubmit = () => {

        const items = cart.map(c => {
            return {
                nameArticulo: c.nameArticulo,
                precioVenta: c.precioVenta,
                qty: c.qty,
                stock: c.stock,
                producto: c._id
            }
        })
        const order = {
            items: items,
            user: { _id: userId }
        }
        //console.log(order)
        dispatch(startAddOrder(order))
        props.replace('/pay')
    }

    const precarga = (data) => {

        setValue("nombre", `${data.nombre}`)
        setValue("apellido", `${data.apellido}`)
        setValue("telefono", `${data.telefono}`)
        setValue("email", `${data.email}`)
        setValue("calle", `${data.domicilio.calle}`)
        setValue("numero", `${data.domicilio.numero}`)
        setValue("localidad", `${data.domicilio.localidad}`)
        setValue("provincia", `${data.domicilio.ciudad}`)
        setUserId(data._id)

    }

    return (

        <>
            <div className="p-3 align-items-center rounded-3 border shadow-lg">

                <div className="card-header h6 text-center mb-3">
                    <span className="me-2 text-muted">Corroborar direccion de envio</span>
                    <button className="btn btn-primary" onClick={() => { setMostrar(!mostrar) }}>ver</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    {
                        mostrar === true &&
                        <>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="input-group m-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            name="nombre"
                                            readOnly
                                            {...register("nombre", {
                                                required: {
                                                    value: true,
                                                    message: 'Nombre es requerido'
                                                }
                                            })}
                                        />
                                    </div>
                                    <span className="text-danger text-small d-block m-1">
                                        {errors.nombre && errors.nombre.message}
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group m-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellido"
                                            name="apellido"
                                            readOnly
                                            {...register("apellido", {
                                                required: {
                                                    value: true,
                                                    message: 'Campo es requerido'
                                                }
                                            })}
                                        />
                                    </div>
                                    <span className="text-danger text-small d-block m-1">
                                        {errors.apellido && errors.apellido.message}
                                    </span>
                                </div>


                            </div>


                            <div className="col">
                                <div className="input-group m-1 ">
                                    <span className="input-group-text">Telef</span>
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        placeholder="Telefono"
                                        name="telefono"
                                        readOnly
                                        {...register("telefono", {
                                            required: {
                                                value: true,
                                                message: 'Campo es requerido'
                                            },
                                        })}
                                    />
                                </div>
                                <span className="text-danger text-small d-block m-1">
                                    {errors.telefono && errors.telefono.message}
                                </span>
                            </div>

                            <div className="col">
                                <div className="input-group m-1">
                                    <span className="input-group-text">Email</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        readOnly
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email es requerido'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message:
                                                    "El formato de e-mail es invalido."
                                            }
                                        })}
                                    />
                                </div>
                                <span className="text-danger text-small d-block m-1">
                                    {errors.email && errors.email.message}
                                </span>
                            </div>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="input-group m-1">
                                        <span className="input-group-text">Calle</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="calle"
                                            {...register("calle", {
                                                required: {
                                                    value: true,
                                                    message: 'Calle es requerido'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z]+/,
                                                    message:
                                                        "Solo texto."
                                                }
                                            })}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.calle && errors.calle.message}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group m-1">
                                        <span className="input-group-text">N°</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numero"
                                            min="0"
                                        />
                                    </div>
                                    <span className="text-danger text-small d-block m-1">
                                        {errors.numero && errors.numero.message}
                                    </span>
                                </div>

                            </div>

                            <div className="col">
                                <div className="input-group m-1">
                                    <span className="input-group-text">Localidad</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="localidad"
                                        {...register("localidad", {
                                            required: {
                                                value: true,
                                                message: 'Localidad es requerido'
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <span className="text-danger text-small d-block mb-2 text-center">
                                {errors.localidad && errors.localidad.message}
                            </span>

                            <div className="input-group m-1">
                                <span className="input-group-text">Provincia</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="provincia"
                                    {...register("provincia", {
                                        required: {
                                            value: true,
                                            message: 'Provincia es requerido'
                                        }
                                    })}
                                />
                            </div>

                            <span className="text-danger text-small d-block mb-2 text-center">
                                {errors.provincia && errors.provincia.message}
                            </span>
                        </>
                    }
                    <div className="d-grid">
                        <div className="text-center gap-2 mt-3">
                            <button className="btn btn-outline-success btn-sm" type="submit">Confirmar compra
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

