import React from 'react'

export const HomeBanner = () => {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active ">
                    <img src="https://http2.mlstatic.com/D_NQ_728689-MLA46825201798_072021-OO.webp" className="d-block img-carousel" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://http2.mlstatic.com/D_NQ_835910-MLA46697553921_072021-OO.webp" className="d-block img-carousel" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://http2.mlstatic.com/D_NQ_774095-MLA46845895480_072021-OO.webp" className="d-block img-carousel" alt="..." />
                </div>
            </div>            
        </div>
    )
}
