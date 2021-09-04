import React, { useEffect, useState } from 'react'
import { Navbar } from '../../ui/Navbar'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'
import { Line } from 'react-chartjs-2'
import { orderGrafics } from '../../../helper/facturas'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFacturas } from '../../../redux/actions/facturasAction'
import { Loading } from '../../ui/Loading'

export const Informes = () => {

    const dispatch = useDispatch()

    const [chartData, setChartData] = useState({})
    const [mes, setMes] = useState();
    const [total, setTotal] = useState();
    //const facturas = useSelector((state) => state.fact.facturas)
    const { loading } = useSelector((state) => state.ui)

    useEffect(() => {
        dispatch(getAllFacturas())

        const resp = async () => {
            const resp = await orderGrafics();
            const [m, t] = resp
            setMes(m)
            setTotal(t)
        }
        resp()
    }, [dispatch])

    useEffect(() => {

        const chart = () => {
            setChartData({
                labels: mes,
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
        chart()
    }, [mes, total])


    return (
        <>
            
            <div className="container-fluid">
                <div className="row flex-nowrap">
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
                                    {
                                        loading ? (
                                            <div className="position-absolute top-50 start-50 translate-middle">
                                                <Loading />
                                            </div>
                                        ) : (
                                            <Line data={chartData} option={{ responsive: true }} />
                                        )
                                    }
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
