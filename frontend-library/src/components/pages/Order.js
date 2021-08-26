import axios from '../../services/AxiosConection'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { startAddOrder } from '../../redux/actions/orderAction'
import { Link } from 'react-router-dom'

export const Order = (prop) => {

    const { props } = prop
    const [history, total] = props

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const emailUser = useSelector(state => state.auth.email)

    const [userEmail, setUserEmail] = useState("")
    const [user, setUser] = useState({})
    const [mostrar, setMostrar] = useState(false)

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`user/email/${emailUser}`);
            setUser(data)
            precarga(data)
        }
        getUser()
    }, [])

    const onSubmit = async () => {

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
            user: userEmail,
            total: total
        }
        //console.log(order)
        const respuesta = await dispatch(startAddOrder(order))
        history.replace({ pathname: "/pay", state: { preferenceId: `${respuesta}` } })
    }

    const precarga = (data) => {

        setValue("nombre", `${data.nombre}`)
        setValue("apellido", `${data.apellido}`)
        setValue("telefono", `${data.telefono}`)
        setValue("email", `${data.email}`)
        setValue("calle", `${data.domicilio.calle}`)
        setValue("numero", `${data.domicilio.numero}`)
        setValue("cp", `${data.domicilio.cp}`)
        setValue("localidad", `${data.domicilio.localidad}`)
        setValue("provincia", `${data.domicilio.provincia}`)
        setUserEmail(data.email)

    }

    return (

        <>
            <div className="p-2 align-items-center rounded-3 border confirm shadow-lg">

                <div className="card-header h6 text-center mb-3">
                    <span className="h5 me-2 text-muted">Verificar dirección de envio</span>
                    <button className="btn btn-sm" onClick={() => { setMostrar(!mostrar) }}>
                        <i className="bi bi-eye text-primary" style={{ fontSize: 25 }} />
                    </button>
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
                                            {...register("nombre")}
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
                                            {...register("apellido",)}
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
                                        {...register("telefono")}
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
                                        {...register("email")}
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
                                            readOnly
                                            {...register("calle")}
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
                                            readOnly
                                            {...register("numero")}
                                        />
                                    </div>
                                    <span className="text-danger text-small d-block m-1">
                                        {errors.numero && errors.numero.message}
                                    </span>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className="col">
                                        <div className="input-group m-1">
                                            <span className="input-group-text">Localidad</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="localidad"
                                                readOnly
                                                {...register("localidad")}
                                            />
                                        </div>
                                    </div>

                                    <span className="text-danger text-small d-block mb-2 text-center">
                                        {errors.localidad && errors.localidad.message}
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group m-1">
                                        <span className="input-group-text">CP</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Codigo Postal"
                                            name="cp"
                                            readOnly
                                            {...register("cp")}
                                        />
                                    </div>

                                    <span className="text-danger text-small d-block mb-2 text-center">
                                        {errors.cp && errors.cp.message}
                                    </span>
                                </div>

                            </div>
                            <div className="col">
                                <div className="input-group m-1 ">
                                    <span className="input-group-text">Provincia</span>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Provincia"
                                        name="provincia"
                                        readOnly
                                        {...register("provincia")}
                                    />
                                </div>
                                <span className="text-danger text-small d-block m-1">
                                    {errors.provincia && errors.provincia.message}
                                </span>
                            </div>

                        </>
                    }
                    <div className="d-grid">
                        <div className="text-center gap-2 mt-3">

                            {cart.length !== 0 &&
                                <button className="btn btn-sm me-2 text-success" style={{ fontSize: 25 }} type="submit">
                                    <i className="bi bi-check-circle" />
                                    <h6>Confirmar</h6>
                                </button>
                            }


                            {mostrar === true &&
                                <Link to="/user" className="btn btn-sm text-warning" style={{ fontSize: 20 }}>
                                    <i className="bi bi-pencil-fill" />
                                    <h6>Cambiar dirección</h6>
                                </Link>
                            }

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

