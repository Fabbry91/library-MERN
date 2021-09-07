import React from 'react'

export const Loading = () => {
    return (

        <div className="text-center justify-content-center">
            <div className="spinner-border text-info" role="status" style={{ fontSize: 20 }} />
            <br />
            <div><h4 className="text-info fw-bold">Cargando 
            <span className="spinner-grow spinner-grow-sm text-info" role="status" aria-hidden="true" style={{ width: 6, height: 6 }}/>
            <span className="spinner-grow spinner-grow-sm text-info" role="status" aria-hidden="true" style={{ width: 6, height: 6 }}/>
            <span className="spinner-grow spinner-grow-sm text-info" role="status" aria-hidden="true" style={{ width: 6, height: 6 }}/>
            </h4></div>
        </div>
    )
}
