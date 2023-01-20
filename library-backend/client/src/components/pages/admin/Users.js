import React, { useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterEmailPassword } from '../../../redux/actions/authAction'
import { startGetAllUsers, startDeleteUser, startEditUser } from '../../../redux/actions/userAction'
import { Loading } from '../../ui/Loading'
import { Dashboard } from './Dashboard'
import Swal from 'sweetalert2'

export const Users = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const { loading } = useSelector((state) => state.ui)
    const [useId, setUseId] = useState()

    //Paginación
    const orderXuser = 6;
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastUser = activePage * orderXuser;
    const indexOfFirstUser = indexOfLastUser - orderXuser;
    const currentUser = user?.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(startGetAllUsers())
    }, [dispatch])

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [passError] = useState();

    const onSubmit = (data, e) => {

        if (useId !== null) {
            const user = { ...data, _id: useId }
            dispatch(startEditUser(user))
        } else {
            dispatch(startRegisterEmailPassword(data));
            Swal.fire({
                icon: 'success',
                title: `Usted se registro con exito`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(startGetAllUsers())
        }
        setUseId(null)
        e.target.reset()
    }

    const handleNewButon = () => {
        setValue("apellido", '')
        setValue("creacion", '')
        setValue("domicilio", '')
        setValue("calle", '')
        setValue("numero", '')
        setValue("cp", '')
        setValue("localidad", '')
        setValue("provincia", '')
        setValue("email", '')
        setValue("nombre", '')
        setValue("telefono", '')
        setValue("tipo", '')
        setUseId(null)
    }

    const handleEdit = (us) => {
        //console.log("el art", us);
        //setMostrar(true)
        setValue("apellido", `${us.apellido}`)
        setValue("creacion", `${us.creacion}`)
        setValue("domicilio", `${us.domicilio}`)
        setValue("calle", `${us.domicilio.calle}`)
        setValue("numero", `${us.domicilio.numero}`)
        setValue("cp", `${us.domicilio.cp}`)
        setValue("localidad", `${us.domicilio.localidad}`)
        setValue("provincia", `${us.domicilio.provincia}`)
        setValue("email", `${us.email}`)
        setValue("nombre", `${us.nombre}`)
        setValue("telefono", `${us.telefono}`)
        setValue("tipo", `${us.tipo}`)
        setUseId(us._id)
    }

    const handleDelete = (id) => {
        dispatch(startDeleteUser(id))
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">

                    <Dashboard />

                    <div className="col py-3">

                        <div className="d-flex justify-content-between gap-2">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <h2 className="h2">Personas</h2>
                            </div>
                        </div>

                        <hr />

                        <div className="container py-3">

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="d-flex bd-highlight">
                                        <div className="p-2 w-100 bd-highlight">
                                            <h5 className="fw-bold text-center">Administradores</h5>
                                        </div>
                                        <div className="p-2 flex-shrink-1 bd-highlight">
                                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleNewButon()}><i className="bi bi-person-plus-fill" /></button>
                                        </div>
                                    </div>
                                    {loading ?
                                        (<Loading />)
                                        :
                                        (
                                            <ul className="list-group">
                                                {currentUser?.map((ad) =>

                                                (ad.tipo[0] === 'admin' &&

                                                    (<li key={ad._id} className="list-group-item mb-2 border border-info border-top-1">

                                                        <h6 className="text-muted">Nombre: <span className="text-dark fw-bold">{ad.nombre} {ad.apellido}</span></h6>
                                                        <h6 className="text-muted">Email: <span className="text-dark fw-bold">{ad.email}</span></h6>
                                                        <h6 className="text-muted">Roll: <span className="text-dark fw-bold" style={{ textTransform: 'capitalize' }}>{ad.tipo[0]}</span></h6>

                                                        <div className="d-flex">
                                                            <button className="btn w-50 m-1 btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { handleEdit(ad) }}>
                                                                <i className="bi bi-pencil-fill" />
                                                            </button>
                                                            <button className="btn w-50 m-1 btn-sm btn-danger" onClick={() => { handleDelete(ad._id) }}>
                                                                <i className="bi bi-trash-fill" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                    )
                                                ))
                                                }

                                            </ul>


                                        )}

                                    <div className="pagination justify-content-center mt-2">
                                        <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={activePage}
                                            itemsCountPerPage={6}
                                            totalItemsCount={user?.length}
                                            pageRangeDisplayed={6}
                                            onChange={handlePageChange}
                                        />
                                    </div>

                                </div>
                                <div className="col">
                                    <div className="d-flex bd-highlight">
                                        <div className="p-2 w-100 bd-highlight">
                                            <h5 className="fw-bold text-center">Clientes</h5>
                                        </div>
                                        <div className="p-2 flex-shrink-1 bd-highlight">
                                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleNewButon()}><i className="bi bi-person-plus-fill" /></button>
                                        </div>
                                    </div>
                                    {loading ?
                                        (<Loading />)
                                        :
                                        (
                                            <ul className="list-group">
                                                {currentUser?.map((cl) =>

                                                (cl.tipo[0] === 'cliente' &&

                                                    (<li key={cl._id} className="list-group-item mb-2 border border-info border-top-1">

                                                        <h6 className="text-muted">Nombre: <span className="text-dark fw-bold">{cl.nombre} {cl.apellido}</span></h6>
                                                        <h6 className="text-muted">Email: <span className="text-dark fw-bold">{cl.email}</span></h6>
                                                        <h6 className="text-muted">Roll: <span className="text-dark fw-bold" style={{ textTransform: 'capitalize' }}>{cl.tipo[0]}</span></h6>

                                                        <div className="d-flex">
                                                            <button className="btn w-50 m-1 btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { handleEdit(cl) }}>
                                                                <i className="bi bi-pencil-fill" />
                                                            </button>
                                                            <button className="btn w-50 m-1 btn-sm btn-danger" onClick={() => { handleDelete(cl._id) }}>
                                                                <i className="bi bi-trash-fill" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                    )
                                                ))
                                                }

                                            </ul>
                                        )}

                                    <div className="pagination justify-content-center mt-2">
                                        <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={activePage}
                                            itemsCountPerPage={6}
                                            totalItemsCount={user?.length}
                                            pageRangeDisplayed={6}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" ria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        useId === null ?
                                            (<h5 className="fw-bold">Crear Usuario</h5>) :
                                            (<h5 className="fw-bold">Editar Usuario</h5>)
                                    }
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">


                                    <div className="container">
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
                                            {useId === null &&
                                                <>
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


                                                </>
                                            }
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

                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    placeholder="Tipo"
                                                    name="tipo"
                                                    {...register("tipo", {
                                                        required: {
                                                            value: true,
                                                            message: 'Campo es requerido'
                                                        }
                                                    })}
                                                >
                                                    <option className="text-muted" placeholder="Elige un rubro" disabled>Selecciona un rubro</option>
                                                    <option value="cliente">Cliente</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <span className="text-danger text-small d-block mb-2">
                                                    {errors.tipo && errors.tipo.message}
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
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                {
                                                    useId === null ?
                                                        (<button type="submit" className="btn btn-primary" disabled={loading} data-bs-dismiss="modal"> Registrarse </button>) :
                                                        (<button type="submit" className="btn btn-primary" disabled={loading} data-bs-dismiss="modal"> Guardar </button>)
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
