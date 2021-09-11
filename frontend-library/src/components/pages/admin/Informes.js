import React, { useEffect, useState } from 'react'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'
import { Line } from 'react-chartjs-2'
import { orderGrafics } from '../../../helper/facturas'
import { useDispatch } from 'react-redux'
import { getAllFacturas } from '../../../redux/actions/facturasAction'
import { Statistics } from './Statistics'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Informes = () => {

    const dispatch = useDispatch()

    const [chartData, setChartData] = useState({})
    const [mes, setMes] = useState();
    const [total, setTotal] = useState();

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
                    label: 'Ventas Mensuales',
                    lineTension: 0.2,
                    pointBorderColor: '#111',
                    pointBackgroundColor: '#ff4000',
                    pointBorderWidth: 2,
                    backgroundColor: 'rgba(52, 152, 219, 0.75)',
                    data: total,
                    borderWhidt: 6
                }]
            })
        }
        chart()
    }, [mes, total])

    const exportPdf = () => {

        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("Informes.pdf");
            })
            ;
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">

                <Dashboard />

                <div className="col py-3">

                    <div className="d-flex justify-content-between">
                        <h2 className="h2">Informes</h2>
                        <button className="btn btn-success" onClick={() => exportPdf()}> <i className="bi bi-printer-fill" /></button>

                    </div>
                    <hr />

                    <div className="container py-3">
                        <div className="row flex-lg-row g-3">

                            <div className="col-12 col-md-8 col-lg-8" id="divToPrint">
                                <Line data={chartData} option={{ responsive: true }} />
                                <h6 className="text-center mb-3">Meses</h6>
                                <Statistics />
                            </div>

                            <div className="col-md-4 col-lg-4">
                                <AboutGo />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
