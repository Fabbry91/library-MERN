import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from '../../services/AxiosConection'
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, startEditByEmail } from '../../redux/actions/userAction';
import { Footer } from '../ui/Footer'
import { Loading } from '../ui/Loading';
import { Navbar } from '../ui/Navbar'
import { getOrderByEmail } from '../../redux/actions/orderAction';
import { ViewOrder } from './ViewOrder';

export const User = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const { loading } = useSelector((state) => state.ui)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [edit, setEdit] = useState(false)


    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`user/email/${auth.email}`);
            precarga(data)
            dispatch(getOneUser(data))
            dispatch(getOrderByEmail(data.email))
        }
        getUser()
    }, [])

    const onSubmit = (data, e) => {
        //console.log(data)
        const us = { ...data }
        dispatch(startEditByEmail(us))
        e.target.reset();
    }

    const handleState = () => {
        setEdit(!edit)
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
    }

    return (
        <>
            <Navbar />

            <div className="b-example-divider"></div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-7 p-4 align-items-center rounded-3 border border-info shadow-lg position-relative">
                        {loading ? (
                            <div className="position-absolute top-50 start-50 translate-middle">
                                <Loading />
                            </div>) :
                            (
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                    <div className="d-flex bd-highlight">
                                        <div className="p-2 w-100 bd-highlight">
                                            <h5 className="fw-bold modal-title">Datos de la cuenta.</h5>
                                        </div>
                                        <div className="p-2 flex-shrink-1 bd-highlight">
                                            <button type="button" className="btn btn-warning btn-sm" onClick={handleState}>
                                                <i className="bi bi-pencil-fill" style={{ fontSize: 15 }} />
                                                <span style={{ fontSize: 15 }}>Editar</span>
                                            </button>
                                        </div>
                                    </div>

                                    <ul className="list-group mt-2">
                                        <li className="list-group-item">
                                            <h6>Nombre Usuario</h6>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className="form-control user-input"
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
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className="form-control user-input"
                                                        placeholder="Apellido"
                                                        name="apellido"
                                                        readOnly
                                                        {...register("apellido", {
                                                            required: {
                                                                value: true,
                                                                message: 'Apellido es requerido'
                                                            }
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <h6>Email</h6>
                                            <input
                                                type="text"
                                                className="form-control user-input"
                                                name="email"
                                                placeholder="Ingresa tu email"
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
                                            {errors.email &&
                                                <span className="text-danger text-small d-block m-1">
                                                    {errors.email && errors.email.message}
                                                </span>
                                            }
                                        </li>
                                    </ul>

                                    <h5 className="fw-bold modal-title mt-2">Datos personales.</h5>
                                    <ul className="list-group mt-2">
                                        <li className="list-group-item">
                                            <h6>Telefono</h6>
                                            <input
                                                type="number"
                                                className="form-control user-input"
                                                placeholder="Ingresa tu telefono"
                                                name="telefono"
                                                {...register("telefono", {
                                                    required: {
                                                        value: true,
                                                        message: 'Campo es requerido'
                                                    },
                                                })}
                                            />
                                            {errors.telefono &&
                                                <span className="text-danger text-small d-block m-1">
                                                    {errors.telefono && errors.telefono.message}
                                                </span>
                                            }
                                        </li>
                                        <li className="list-group-item">
                                            <h6>Dirección</h6>
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className="form-control user-input"
                                                        placeholder="Domicilio"
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
                                                    {errors.calle &&
                                                        <span className="text-danger text-small d-block mb-2">
                                                            {errors.calle && errors.calle.message}
                                                        </span>
                                                    }
                                                </div>
                                                <div className="col-6">
                                                    <input
                                                        type="text"
                                                        className="user-input"
                                                        placeholder="Numero"
                                                        name="numero"
                                                        min="0"
                                                        {...register("numero")}
                                                    />
                                                </div>
                                            </div>
                                        </li>

                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h6>CP</h6>
                                                    <input
                                                        type="number"
                                                        className="form-control user-input"
                                                        placeholder="Codigo Postal"
                                                        name="cp"
                                                        {...register("cp", {
                                                            required: {
                                                                value: true,
                                                                message: 'Campo es requerido'
                                                            },
                                                        })}
                                                    />
                                                    {errors.cp &&
                                                        <span className="text-danger text-small d-block mb-2">
                                                            {errors.cp && errors.cp.message}
                                                        </span>
                                                    }
                                                </div>
                                                <div className="col-6">
                                                    <h6>Localidad</h6>
                                                    <input
                                                        type="text"
                                                        className="form-control user-input"
                                                        placeholder="Localidad"
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
                                        </li>
                                        <li className="list-group-item">
                                            <h6>Provincia</h6>
                                            <input
                                                type="text"
                                                className="form-control user-input"
                                                placeholder="Provincia"
                                                name="provincia"
                                                {...register("provincia", {
                                                    required: {
                                                        value: true,
                                                        message: 'Provincia es requerido'
                                                    }
                                                })}
                                            />
                                            {errors.provincia &&
                                                <span className="text-danger text-small d-block mb-2">
                                                    {errors.provincia && errors.provincia.message}
                                                </span>
                                            }
                                        </li>
                                    </ul>
                                    <div className="text-center mt-2">
                                        {edit === true &&
                                            <button type=" submit " className="btn btn-outline-info text-dark">
                                                <i className="bi bi-check-circle-fill" /> &nbsp;
                                                Guardar
                                            </button>
                                        }
                                    </div>
                                </form>)
                        }
                    </div>

                    <div className="col-5">
                        <ViewOrder />
                    </div>
                </div>
            </div>
            <div className="b-example-divider"></div>
            <Footer />
        </>
    )
}
