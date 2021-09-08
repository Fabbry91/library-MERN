import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { startFacebookLogin, startGoogleLogin, startLoginEmailPassword } from '../../../redux/actions/authAction'

export const Login = ({ history }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        const { email, password } = data;

        await dispatch(startLoginEmailPassword(email, password));
        history.replace("/")
        //e.target.reset();
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
        history.replace("/")
    }

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin())
        history.replace("/")
    }

    return (
        <div className="container w-75 mt-5 rounded shadow">

            <div className="row align-items-stretch">

                <div className="col bg d-none d-md-block d-lg-block col-md-5 col-lg-5 col-xl-6 rounded align-items-center">
                    <img src="./assets/img/imagen-1.jpg" className="img-login" alt="imagen-1"></img>
                </div>


                <div className="col bg-white p-5 rounded-end">

                    <div className="text-center">
                        <img src="./assets/img/go.png" width="60" alt="logo"></img>
                    </div>
                    <hr />

                    <h2 className="fw-bold text-center py5">Bienvenidos</h2>

                    <div className="text-center">
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                            <div className="mb-4">
                                <input
                                    type="email"
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

                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
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
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" disabled={loading}> Login </button>
                            </div>

                            <div className="my-3">
                                <span> ¿No tiene cuenta? <Link to="/register">Registrate</Link></span>
                            </div>
                        </form>


                        <div className="container w-100 my-5">
                            <div className="row text-center">
                                <div className="col-12">Iniciar Sesión</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-outline-primary w-100 my-1" onClick={handleFacebookLogin}>
                                        <div className="row align-items-center">
                                            <div className="col-2 d-none d-md-block">
                                                <img src="./assets/img/face.png" width="30" alt="" />
                                            </div>
                                            <div className="col-12 col-md-10 text-center">
                                                Facebook
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-outline-danger w-100 my-1" onClick={handleGoogleLogin}>
                                        <div className="row align-items-center">
                                            <div className="col-2 d-none d-md-block">
                                                <img src="./assets/img/google.png" width="40" alt="" />
                                            </div>
                                            <div className="col-12 col-md-10 text-center">
                                                Google
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
