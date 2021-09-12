import React from 'react'

export const HomeBanner = () => {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active ">
                    <img src={process.env.PUBLIC_URL + "/assets/img/banner-01.jpg"} className="d-block img-carousel" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={process.env.PUBLIC_URL + "/assets/img/banner-02.jpg"} className="d-block img-carousel" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={process.env.PUBLIC_URL + "/assets/img/banner.jpg"} className="d-block img-carousel" alt="..." />
                </div>
            </div>            
        </div>
    )
}
