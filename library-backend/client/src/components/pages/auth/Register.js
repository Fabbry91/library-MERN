import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisterEmailPassword } from '../../../redux/actions/authAction'


export const Register = ({ history }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [passError, setPassError] = useState();

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const onSubmit = (data, e) => {

        const {
            password,
            password1,
        } = data

        if (password !== password1) {
            return setPassError('Las contraseñas no son iguales')
        }
        setPassError();
        dispatch(startRegisterEmailPassword(data));
        history.replace("/login")
        e.target.reset()
    }

    return (

        <div className="container w-75 mt-5 rounded shadow">

            <div className="row">

                <div className="col bg-white p-5 rounded-start">

                    <h2 className="fw-bold text-center py5">Registrate</h2>

                    <div className="text-center">
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                            <div className="mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Ingresa tu email"
                                    name="email"
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
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.email && errors.email.message}
                                </span>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nueva Contraseña"
                                    name="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Contraseña es requerido'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Debe tener como minimo 6 caracteres"
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.password && errors.password.message}
                                </span>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita Contraseña"
                                    name="password1"
                                    {...register("password1", {
                                        required: {
                                            value: true,
                                            message: 'Password es requerido'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Debe tener como minimo 6 caracteres"
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.password1 && errors.password1.message}
                                    {passError &&
                                        <span className="text-danger text-small d-block mb-2">{passError}</span>
                                    }
                                </span>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    name="apellido"
                                    {...register("apellido", {
                                        required: {
                                            value: true,
                                            message: 'Apellido es requerido'
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.apellido && errors.apellido.message}
                                </span>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="nombre"
                                    {...register("nombre", {
                                        required: {
                                            value: true,
                                            message: 'Nombre es requerido'
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.nombre && errors.nombre.message}
                                </span>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="Number"
                                    className="form-control"
                                    placeholder="Telefono"
                                    name="telefono"
                                    {...register("telefono", {
                                        required: {
                                            value: true,
                                            message: 'Campo es requerido'
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message:
                                                "El formato de e-mail es invalido."
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.telefono && errors.telefono.message}
                                </span>
                            </div>

                            <div className="row">

                                <div className="col-md-2 col-lg-2">
                                    Direccion:
                                </div>

                                <div className="col-md-10 col-lg-10">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Calle"
                                            name="calle"
                                            {...register("calle", {
                                                required: {
                                                    value: true,
                                                    message: 'Calle es requerido'
                                                },
                                            })}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.calle && errors.calle.message}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Numero"
                                            name="numero"
                                            min="0"
                                            {...register("numero")}
                                        />
                                        <span className="text-danger text-small d-block m-1">
                                            {errors.numero && errors.numero.message}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Codigo Postal"
                                            name="cp"
                                            {...register("cp", {
                                                required: {
                                                    value: true,
                                                    message: 'Codigo Postal es requerido'
                                                }
                                            })}
                                        />
                                        <span className="text-danger text-small d-block mb-2 text-center">
                                            {errors.cp && errors.cp.message}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Localidad"
                                            name="localidad"
                                            {...register("localidad", {
                                                required: {
                                                    value: true,
                                                    message: 'Campo es requerido'
                                                }
                                            })}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.localidad && errors.localidad.message}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Provincia"
                                            name="provincia"
                                            {...register("provincia", {
                                                required: {
                                                    value: true,
                                                    message: 'Campo es requerido'
                                                }
                                            })}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.provincia && errors.provincia.message}
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" disabled={loading}> Registrarse </button>
                            </div>

                        </form>

                    </div>

                </div>

                <div className="col bg d-none d-md-block d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
                    <img src="./assets/img/imagen-1.jpg" className="img-login" alt="imagen-1" />
                    <div className="my-3">
                        <span> ¿Ya tiene cuenta? <Link to="/login">Regresar al Login</Link></span>
                    </div>
                </div>

            </div>
        </div>

    )
}
