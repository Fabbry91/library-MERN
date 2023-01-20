import React from 'react'

const MethodPays = () => {
    return (
        <div className='container-pagos'>
            <h2 className="title-pays" style={{ textAlign: 'center', padding: '1.2em', marginTop:'0.7em' }}> Use el metodo de pago más conveniente </h2>

            <div className='pagos'>
                <div className='box-img'>
                    <img src={process.env.PUBLIC_URL + "/assets/img/mp.png"} alt="logo" width="150 px" />
                </div>
                <div className='box-img'>
                    <img src={process.env.PUBLIC_URL + "/assets/img/rp.png"} alt="logo" width="240 px" />
                </div>
                <div className='box-img' style={{width:'70px', height:'70px'}}>
                    <img src={process.env.PUBLIC_URL + "/assets/img/visa.png"} alt="logo" width="150 px" />
                </div>
                <div className='box-img'>
                    <img src={process.env.PUBLIC_URL + "/assets/img/pagoFacil.png"} alt="logo" width="140 px" />
                </div>
                <div className='box-img'>
                    <img src={process.env.PUBLIC_URL + "/assets/img/mastercard.png"} alt="logo" width="140 px" />
                </div>
            </div>
        </div>
    )
}

export default MethodPays