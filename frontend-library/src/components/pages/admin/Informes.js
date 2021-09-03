import React, { useEffect, useState } from 'react'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'
import { Line } from 'react-chartjs-2'
import { orderGrafics } from '../../../helper/facturas'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFacturas } from '../../../redux/actions/facturasAction'

export const Informes = () => {

    const dispatch = useDispatch()

    const [chartData, setChartData] = useState({})
    const facturas = useSelector(state => state.fact.facturas)

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getAllFacturas())
        chart()
    }, [dispatch])



    const chart = async () => {
        const respuesta = await orderGrafics(facturas)
        const meses = respuesta.map(r => r.fecha)
        const total = respuesta.map(r => r.total)

        setChartData({
            labels: meses,
            datasets: [{
                label: 'Ventas Diarias',
                data: total,
                backgroundColor: [
                    'rgba(75,192,192,0.6)'
                ],
                borderWhidt: 4
            }]
        })
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <Dashboard />

                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container py-3">
                            <div className="row flex-lg-row g-3">

                                <div className="d-flex justify-content-between gap-2">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <h2 className="h2">Informes</h2>
                                    </div>
                                    <div className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </div>
                                </div>

                                <hr />

                                <div className="col-12 col-md-8 col-lg-8">

                                    <Line data={chartData} option={{ responsive: true }} />

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
