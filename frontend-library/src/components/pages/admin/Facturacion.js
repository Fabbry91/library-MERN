import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from "react-js-pagination"
import SearchField from "react-search-field"
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


import { getAllFacturas } from '../../../redux/actions/facturasAction'
import { AboutGo } from './AboutGo'
import { Dashboard } from './Dashboard'

export const Facturacion = () => {

    const dispatch = useDispatch();
    const facturas = useSelector((state) => state.fact.facturas)
    const [totalPrice, setTotalPrice] = useState()
    const [oneFact, setOneFact] = useState({})
    const [verSerch, setVerSerch] = useState(false);
    const [search, setSearch] = useState([]);

    //Paginación
    const factXpag = 5;
    const [activePage, setCurrentPage] = useState(1);
    const indexOfLastFact = activePage * factXpag;
    const indexOfFirstFact = indexOfLastFact - factXpag;
    const currentFact = facturas?.slice(indexOfFirstFact, indexOfLastFact);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getAllFacturas())
    }, [dispatch])

    useEffect(() => {
        let totals = 0

        facturas.forEach(fact => {
            totals += fact.total
        });
        setTotalPrice(totals)
    }, [facturas, totalPrice, setTotalPrice])

    const exportPdf = () => {

        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("facturacion.pdf");
            })
            ;
    }
    const handleFactura = (id) => {
        const factura = facturas.find((f) => f._id === id);
        setOneFact(factura)
    }

    // Metodo Search
    const onChangeHandler = (valor, e) => {
        if (valor === '') {
            setVerSerch(false)
        } else {
            const result = facturas.filter((post) => {
                const postName = post.pedido?.user?.toLowerCase();
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

                        <div className="d-flex justify-content-between gap-2">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <h2 className="h2">Facturación</h2>
                            </div>
                            <div className="d-flex">

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn btn-success me-2"
                                    table="table-to-xls"
                                    filename="facturacion"
                                    sheet="facturacion"
                                    buttonText="Excel" />

                                <SearchField
                                    placeholder="Buscar por Usuario"
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="row">
                            <div className="col-12 col-md-8 col-lg-8">

                                <div className="table-responsive ">

                                    <table className="table table-info table-striped text-center" id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th scope="col">N° Factura</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Factura</th>
                                                <th scope="col">Subtotales</th>
                                            </tr>
                                        </thead>
                                        <>
                                            {verSerch === false ?
                                                (
                                                    <tbody>
                                                        {currentFact &&
                                                            currentFact.map((f, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ textTransform: 'capitalize' }}>{f.numero}</td>
                                                                    <td >{f.fecha.slice(0, 10)}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => handleFactura(f._id)}>
                                                                            <span className="visually-hidden">{f.user?.email} Ord: <span style={{ textTransform: 'uppercase' }}>{f.pedido?.preferenceId?.slice(-3)}</span></span>
                                                                            <i className="bi bi-person-fill" />
                                                                            <i className="bi bi-printer-fill" />
                                                                        </button>
                                                                    </td>
                                                                    <td >$ {f.total}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                )
                                                :
                                                (
                                                    <tbody>
                                                        {search.length > 0 ?
                                                            (
                                                                search.map((f, index) => (
                                                                    <tr key={index}>
                                                                        <td style={{ textTransform: 'capitalize' }}>{f.numero}</td>
                                                                        <td >{f.fecha.slice(0, 10)}</td>
                                                                        <td>
                                                                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => handleFactura(f._id)}>
                                                                                <i className="bi bi-person-fill" />
                                                                                <i className="bi bi-printer-fill" />
                                                                            </button>
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
                                            <tfoot>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="fw-bold">Total Facturado:</td>
                                                    <td className="fw-bold">${totalPrice}</td>
                                                </tr>
                                            </tfoot>
                                        </>
                                    </table>
                                </div>

                                <div className="collapse" id="collapseExample">
                                    <div className="container">
                                        <div className="card" id="divToPrint">
                                            <div className="card card-body">
                                                <div className="div">
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <h3 className="fw-bold">
                                                                <img src={process.env.PUBLIC_URL + "/assets/img/go.png"} width="70" className="img-fluid" alt="" /> &nbsp;&nbsp;&nbsp;Go Art
                                                            </h3>
                                                            <br />
                                                            <span className="h6 fw-bold">Ciudad de Mendoza &nbsp; CP:5530
                                                                <br />
                                                                Telefono:(261)4251095
                                                            </span>
                                                        </div>

                                                        <div className="col-md-auto"><span className="h2">X</span></div>

                                                        <div className="col">
                                                            <div className="d-flex justify-content-between">
                                                                <h5 className="fw-bold">Factura N°: {oneFact.numero} </h5>
                                                                <button className="btn btn-success" onClick={() => exportPdf()}> Print</button>
                                                            </div>
                                                            <h5 className="fw-bold">Fecha: {oneFact.fecha?.slice(0, 10)} </h5>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col text-left">
                                                            <span className="text-muted">Cliente:</span> <span className="card-text fw-bold">{oneFact.user?.nombre} {oneFact.user?.apellido}</span>
                                                            <br />
                                                            <span className="text-muted">Email:</span> <span className="card-text fw-bold">{oneFact.user?.email}</span>
                                                            <br />
                                                            <span className="text-muted">Contacto:</span> <span className="card-text fw-bold">{oneFact.user?.telefono}</span>
                                                        </div>
                                                        <div className="col">
                                                            <span className="text-muted">Domicilio:</span> <span className="card-text fw-bold">{oneFact.user?.domicilio?.calle}</span>
                                                            <br />
                                                            <span className="text-muted">N°:</span> <span className="card-text fw-bold">{oneFact.user?.domicilio?.numero}</span> <span className="text-muted ms-2">CP:</span> <span className="card-text fw-bold">{oneFact.user?.domicilio?.cp}</span>
                                                            <br />
                                                            <span className="text-muted">Localidad:</span> <span className="card-text fw-bold">{oneFact.user?.domicilio?.localidad}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" table-responsive mt-3">
                                                    <div className="table-responsive">
                                                        <table className="table table-info table-striped text-center">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th scope="col">Articulo</th>
                                                                    <th scope="col">Precio Unitario</th>
                                                                    <th scope="col">Cantidad</th>
                                                                    <th scope="col">Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <>
                                                                    {oneFact?.pedido &&
                                                                        oneFact?.pedido?.items.map((p, index) => (
                                                                            <tr key={index}>
                                                                                <td style={{ textTransform: 'capitalize' }}>{p.title}</td>
                                                                                <td >{p.unit_price}</td>
                                                                                <td >{p.quantity}</td>
                                                                                <td >{p.quantity * p.unit_price}</td>
                                                                            </tr>
                                                                        )
                                                                        )

                                                                    }
                                                                </>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td className="fw-bold">Total</td>
                                                                    <td className="fw-bold">${oneFact.total}</td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                    <div className="col-12 text-center">
                                                        <span className="text-muted">Orden:</span> <span className="card-text fw-bold" style={{textTransform:'uppercase'}}>{oneFact.pedido?.preferenceId.slice(-3)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                itemsCountPerPage={5}
                                totalItemsCount={facturas.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
