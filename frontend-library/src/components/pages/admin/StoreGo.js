import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo, startAddArticulo, startDeleteArticulo } from '../../../redux/actions/articuloActions'
import { getAllRubro } from '../../../redux/actions/rubroAction'
import { Loading } from '../../ui/Loading'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'

export const StoreGo = () => {

    const dispatch = useDispatch();
    const { articulos } = useSelector(state => state.art);
    const { loading } = useSelector(state => state.ui);
    const { rubro } = useSelector(state => state.rub);
    const [mostrar, setMostrar] = useState(false);
    const [idArt, setIdArt] = useState(null)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    useEffect(() => {
        dispatch(getAllArticulo())
        dispatch(getAllRubro())
    }, [])

    const handleDelete = (id) => {
        dispatch(startDeleteArticulo(id))
    }

    const handleNewButon = () => {
        setIdArt(null)
        setValue("description", ``)
        setValue("nameArticulo", ``)
        setValue("precioCompra", ``)
        setValue("precioVenta", ``)
        setValue("rubros", ``)
        setValue("stock", ``)
        setMostrar(true)
    }

    const handleEdit = (art) => {
        //console.log("el art", art);
        setMostrar(true)
        setValue("description", `${art.description}`)
        setValue("nameArticulo", `${art.nameArticulo}`)
        setValue("precioCompra", `${art.precioCompra}`)
        setValue("precioVenta", `${art.precioVenta}`)
        setValue("rubros", `${art.rubros}`)
        setValue("stock", `${art.stock}`)
        setIdArt(art._id)
    }

    const onSubmit = (data, e) => {
        //console.log(data)
        if (idArt) {
            const editArt = { ...data, _id: idArt }
            dispatch(startAddArticulo(editArt))
            console.log("editada", editArt)
        } else {
            dispatch(startAddArticulo(data));
        }
        e.target.reset();
        setMostrar(false)
    }

    return (
        <>
            <Navbar />
            <div className="b-example-divider"></div>

            <div className="container py-3">
                <div className="row flex-lg-row g-3 py-5">

                    <div className="col-md-4 col-lg-4">
                        {mostrar === true ?
                            (
                                <>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="h5">Nuevo articulos.</span>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">


                                        <div className="mb-3">
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="Nombre articulo"
                                                name="url"
                                                {...register('url')}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre articulo"
                                                name="nameArticulo"
                                                {...register("nameArticulo", {
                                                    required: {
                                                        value: true,
                                                        message: 'Nombre es requerido'
                                                    }
                                                })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {errors.nameArticulo && errors.nameArticulo.message}
                                            </span>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Precio Compra"
                                                name="precioCompra"
                                                {...register("precioCompra", {
                                                    required: {
                                                        value: true,
                                                        message: 'Campo es requerido'
                                                    },
                                                    pattern: {
                                                        value: /[0-9]?[0-9]?(\.[0-9][0-9]?)?/,
                                                        message:
                                                            "El formato de numero debe tener dos decimales 3.00 ."
                                                    }
                                                })}
                                            />
                                        </div>
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.precioCompra && errors.precioCompra.message}
                                        </span>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Precio Venta"
                                                name="precioVenta"
                                                {...register("precioVenta", {
                                                    required: {
                                                        value: true,
                                                        message: 'Campo es requerido'
                                                    },
                                                    pattern: {
                                                        value: /[0-9]?[0-9]?(\.[0-9][0-9]?)?/,
                                                        message:
                                                            "El formato de numero debe tener dos decimales 3.00 ."
                                                    }
                                                })}
                                            />
                                        </div>
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.precioVenta && errors.precioVenta.message}
                                        </span>

                                        <div className="input-group mb-3">
                                            <textarea
                                                className="form-control"
                                                placeholder="Descripción max 300 caracteres"
                                                name="description"
                                                {...register("description", {
                                                    pattern: {
                                                        value: /^[\s\S]{0,300}$/,
                                                        message:
                                                            "El max de 300 caracteres ."
                                                    }
                                                })}
                                            >
                                            </textarea>
                                        </div>
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.description && errors.description.message}
                                        </span>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Stock</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Cantidad Disponible"
                                                name="stock"
                                                {...register("stock", {
                                                    required: {
                                                        value: true,
                                                        message: 'Campo es requerido'
                                                    },
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message:
                                                            "Formato solo numeros ."
                                                    }
                                                })}
                                            />
                                        </div>
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.stock && errors.stock.message}
                                        </span>

                                        <div className="input-group mb-3">
                                            <select
                                                className="form-select"
                                                name="rubros"
                                                {...register("rubros", {
                                                    required: {
                                                        value: true,
                                                        message: 'Campo es requerido'
                                                    },
                                                })}
                                            >
                                                <option className="text-muted" placeholder="Elige un rubro" disabled>Selecciona un rubro</option>
                                                {
                                                    rubro &&
                                                    rubro.map(r => (
                                                        <option key={r.id} value={r.nameRubro}>{r.nameRubro}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.rubro && errors.rubro.message}
                                        </span>

                                        <div className="mb-3 d-grid gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={loading}> Guardar </button>
                                        </div>
                                    </form>

                                </>
                            ) :
                            (<AboutGo />)
                        }

                    </div>

                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="d-flex justify-content-between gap-2">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button type="button" onClick={handleNewButon} className="btn btn-primary btn-md">Nuevo Articulo</button>
                            </div>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                        <hr />

                        {loading ?
                            (<Loading />)
                            :
                            (
                                <div className="table-responsive">
                                    <table className="table table-success table-striped mt-4 text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Articulo</th>
                                                <th scope="col">P Compra</th>
                                                <th scope="col">P Venta</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Rubro</th>
                                                <th scope="col">Accion</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {articulos &&
                                                articulos.map((a, index) => (
                                                    <tr key={index}>
                                                        <td style={{textTransform: 'capitalize'}}>{a.nameArticulo}</td>
                                                        <td>$ {a.precioCompra}</td>
                                                        <td>$ {a.precioVenta}</td>
                                                        <td>{a.stock} und.</td>
                                                        <td style={{textTransform: 'capitalize'}}>{a.rubros}</td>
                                                        <td>
                                                            <div className="row">
                                                                <div>
                                                                    <button className="w-50 btn-md btn-danger" onClick={() => { handleDelete(a._id) }} >x</button>

                                                                    <button className="w-50 btn-md btn-warning" onClick={() => { handleEdit(a) }} >x</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="b-example-divider"></div>
        </>
    )
}
