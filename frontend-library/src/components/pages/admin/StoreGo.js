import React, { useEffect, useState } from 'react'
import SearchField from "react-search-field"
import Pagination from "react-js-pagination"

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo, startAddArticulo, startDeleteArticulo } from '../../../redux/actions/articuloActions'
import { getAllRubro } from '../../../redux/actions/rubroAction'

import { Loading } from '../../ui/Loading'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'

export const StoreGo = () => {

    const dispatch = useDispatch();

    const { articulos } = useSelector(state => state.art);
    const { loading } = useSelector(state => state.ui);
    const { rubro } = useSelector(state => state.rub);

    const [verSerch, setVerSerch] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [search, setSearch] = useState([]);
    const [idArt, setIdArt] = useState(null)

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    //Paginacion

    const artXpag = 7;
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastArt = activePage * artXpag;
    const indexOfFirstArt = indexOfLastArt - artXpag;
    const currentArt = articulos.slice(indexOfFirstArt, indexOfLastArt);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getAllArticulo())
        dispatch(getAllRubro())
    }, [dispatch])

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
            //console.log("editada", editArt)
        } else {
            dispatch(startAddArticulo(data));
        }
        e.target.reset();
        setMostrar(false)
    }

    // Metodo Search
    const onChangeHandler = (valor, e) => {

        if (valor === '') {
            setVerSerch(false)
        } else {
            const result = articulos.filter((post) => {
                const postName = post.nameArticulo.toLowerCase();
                return postName.includes(valor)
            })
            setSearch(result)
            setVerSerch(true)
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">

                    <Dashboard />

                    <div className="col py-3">

                        <h1 className="h2">Articulos</h1>
                        <hr />

                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="col-12 col-md-8 col-lg-8">
                                    <div className="d-flex justify-content-between gap-2">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <button type="button" onClick={handleNewButon} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-primary btn-md">Nuevo Articulo</button>

                                            <ReactHtmlTableToExcel
                                                id="test-table-xls-button"
                                                className="btn btn-success me-2"
                                                table="table-to-xls"
                                                filename="articulos"
                                                sheet="articulos"
                                                buttonText="Excel" />

                                        </div>
                                        <div className="d-flex search">
                                            <SearchField
                                                placeholder="Buscar..."
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    </div>

                                    {loading ?
                                        (<Loading />)
                                        :
                                        (
                                            <>
                                                <div className=" table-responsive mt-3">
                                                    <table className="table table-info table-striped mt-4 text-center " id="table-to-xls">
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
                                                        {verSerch === false ?
                                                            (<tbody>
                                                                {currentArt &&
                                                                    currentArt.map((a, index) => (
                                                                        <tr key={index}>
                                                                            <td style={{ textTransform: 'capitalize' }}>{a.nameArticulo}</td>
                                                                            <td>$ {a.precioCompra}</td>
                                                                            <td>$ {a.precioVenta}</td>
                                                                            <td>{a.stock} und.</td>
                                                                            <td style={{ textTransform: 'capitalize' }}>{a.rubros}</td>
                                                                            <td>
                                                                                <div className="row">
                                                                                    <div>
                                                                                        <button className="w-50 btn btn-sm btn-danger" onClick={() => { handleDelete(a._id) }} >
                                                                                            <i className="bi bi-trash-fill" />
                                                                                        </button>

                                                                                        <button className="w-50 btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { handleEdit(a) }} >
                                                                                            <i className="bi bi-pencil-fill" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                            ) : (
                                                                <tbody>
                                                                    {search.length > 0 ?
                                                                        (
                                                                            search.map((a, index) => (
                                                                                <tr key={index}>
                                                                                    <td style={{ textTransform: 'capitalize' }}>{a.nameArticulo}</td>
                                                                                    <td>$ {a.precioCompra}</td>
                                                                                    <td>$ {a.precioVenta}</td>
                                                                                    <td>{a.stock} und.</td>
                                                                                    <td style={{ textTransform: 'capitalize' }}>{a.rubros}</td>
                                                                                    <td>
                                                                                        <div className="row">
                                                                                            <div>
                                                                                                <button className="w-50 btn btn-sm btn-danger" onClick={() => { handleDelete(a._id) }} >
                                                                                                    <i className="bi bi-trash-fill" />
                                                                                                </button>

                                                                                                <button className="w-50 btn btn-sm btn-warning" onClick={() => { handleEdit(a) }} >
                                                                                                    <i className="bi bi-pencil-fill" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            ))) :
                                                                        (
                                                                            <tr >
                                                                                <td colSpan={6} className="table-active">No se encontraron elementos con ese nombre.</td>

                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            )
                                                        }
                                                    </table>
                                                </div>
                                            </>
                                        )
                                    }

                                </div>

                                <div className="col-md-4 col-lg-4">
                                    <AboutGo />
                                </div>

                            </div>

                            <div className="d-flex justify-content-center">
                                <hr />
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={7}
                                    totalItemsCount={articulos.length}
                                    pageRangeDisplayed={7}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" ria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {
                                    idArt === null ?
                                        (<h5 className="fw-bold">Nuevo Articulo</h5>) :
                                        (<h5 className="fw-bold">Editar Articulo</h5>)
                                }
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {mostrar === true &&

                                    <>
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
                                                    placeholder="Descripción max 2000 caracteres"
                                                    name="description"
                                                    {...register("description", {
                                                        pattern: {
                                                            value: /^[\s\S]{0,2000}$/,
                                                            message:
                                                                "El max de 2000 caracteres ."
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

                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={loading} data-bs-dismiss="modal"> Guardar </button>
                                            </div>
                                        </form>

                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
