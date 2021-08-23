import React from 'react'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Informes = () => {
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
                                        <h2 className="h2">Rubros</h2>
                                    </div>
                                    <div className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">


                                   
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
