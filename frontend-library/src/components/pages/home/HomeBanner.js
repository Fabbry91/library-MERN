import React from 'react'

export const HomeBanner = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://http2.mlstatic.com/D_NQ_728689-MLA46825201798_072021-OO.webp" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://http2.mlstatic.com/D_NQ_835910-MLA46697553921_072021-OO.webp" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://http2.mlstatic.com/D_NQ_774095-MLA46845895480_072021-OO.webp" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
