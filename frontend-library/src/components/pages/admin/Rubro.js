import React, { useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import SearchField from "react-search-field"

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRubro, startAddRubro, startDeleteRubro } from '../../../redux/actions/rubroAction';

import { AboutGo } from './AboutGo'
import { Loading } from '../../ui/Loading';
import { Dashboard } from './Dashboard';

export const Rubro = () => {

    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm()

    const { rubro } = useSelector(state => state.rub)
    const { loading } = useSelector(state => state.ui);

    const [verSerch, setVerSerch] = useState(false);
    const [search, setSearch] = useState([]);

    //Paginación
    const rubXpag = 5;
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastRub = activePage * rubXpag;
    const indexOfFirstRub = indexOfLastRub - rubXpag;
    const currentRub = rubro.slice(indexOfFirstRub, indexOfLastRub);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const onSubmit = (data, e) => {
        dispatch(startAddRubro(data));
        e.target.reset();
    }

    useEffect(() => {
        dispatch(getAllRubro())
    }, [dispatch])

    const handleDelete = (id) => {
        //console.log(id);
        dispatch(startDeleteRubro(id));
    }

    // Metodo Search
    const onChangeHandler = (valor, e) => {
        if (valor === '') {
            setVerSerch(false)
        } else {
            const result = rubro.filter((post) => {
                const postName = post.nameRubro.toLowerCase();
                return postName.includes(valor)
            })
            setSearch(result)
            setVerSerch(true)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowraps">
                    <Dashboard />

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <h2 className="h2">Rubros</h2>
                                    </div>
                                    <div className="d-flex">
                                        <SearchField
                                            placeholder="Buscar..."
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">


                                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                        <div className="row">
                                            <div className="col-md col-lg">
                                                <div className="form-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nuevo Rubro"
                                                        name="nameRubro"
                                                        {...register("nameRubro", {
                                                            required: {
                                                                value: true,
                                                                message: 'Nombre es requerido'
                                                            }
                                                        })}
                                                    />
                                                </div>
                                                <span className="text-danger text-small d-block mb-2">
                                                    {errors.nameRubro && errors.nameRubro.message}
                                                </span>
                                            </div>
                                            <div className="col-md-2 col-lg-3">
                                                <div className="mb-3 d-grid gap-2">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-md"
                                                        disabled={loading}
                                                    >Crear Rubro</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <ul className="list-group">

                                        {loading ?
                                            (<Loading />)
                                            :
                                            (
                                                <>
                                                    {verSerch === false ?
                                                        (
                                                            currentRub &&
                                                            currentRub.map((rub, index) => (

                                                                <li className="card mb-2" key={index}>
                                                                    <div className="d-flex flex-row p-1 justify-content-between">
                                                                        <span className="h4 bd-highlight">{rub.nameRubro}</span>
                                                                        <div className="p-1 bd-highlights">
                                                                            <button className="btn btn-danger" onClick={() => { handleDelete(rub.id) }}>
                                                                                <i className="bi bi-trash-fill" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))

                                                        )

                                                        :

                                                        (
                                                            search.length <= 0 ?
                                                                (
                                                                    <li className="card mb-2">
                                                                        <div className="d-flex flex-row p-1 justify-content-center">
                                                                            <span className="h4 bd-highlight">No existe Rubro con ese nombre</span>
                                                                        </div>
                                                                    </li>
                                                                )
                                                                :
                                                                (
                                                                    search.map((rub, index) => (

                                                                        <li className="card mb-2" key={index}>
                                                                            <div className="d-flex flex-row p-1 justify-content-between">
                                                                                <span className="h4 bd-highlight">{rub.nameRubro}</span>
                                                                                <div className="p-1 bd-highlights">
                                                                                    <button className="btn btn-danger" onClick={() => { handleDelete(rub.id) }}>
                                                                                        <i className="bi bi-trash-fill" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                )

                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </ul>

                                    <div className="pagination justify-content-center">
                                        <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={activePage}
                                            itemsCountPerPage={5}
                                            totalItemsCount={rubro.length}
                                            pageRangeDisplayed={5}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg-4">
                                    <AboutGo />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
