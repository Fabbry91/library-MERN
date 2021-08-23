import React from 'react'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Users = () => {
    return (
        <>
            <Navbar />

            <div class="container-fluid">
                <div class="row">
                    <Dashboard />

                    <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <h2 className="h2">Personas</h2>
                                    </div>
                                    <div className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="d-flex bd-highlight">
                                                <div className="p-2 w-100 bd-highlight">
                                                    <h5 className="fw-bold text-center">Usuarios Go!</h5>
                                                </div>
                                                <div className="p-2 flex-shrink-1 bd-highlight">
                                                    <button className="col-6 btn btn-warning">x</button>
                                                </div>
                                            </div>
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    A list item
                                                    <div className="row">
                                                        <button className="col-6 btn btn-warning">x</button>
                                                        <button className="col-6 btn btn-danger">x</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex bd-highlight">
                                                <div className="p-2 w-100 bd-highlight">
                                                    <h5 className="fw-bold text-center">Clientes</h5>
                                                </div>
                                                <div className="p-2 flex-shrink-1 bd-highlight">
                                                    <button className="col-6 btn btn-warning">x</button>
                                                </div>
                                            </div>
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    A list item
                                                    <div className="row">
                                                        <button className="col-6 btn btn-warning">x</button>
                                                        <button className="col-6 btn btn-danger">x</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
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
