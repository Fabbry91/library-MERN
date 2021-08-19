import React from 'react'

export const Footer = () => {
    return (
        <div className="container">
            <div className="row">

                <div className="col-6 col-md">
                    <h5>Features</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="link-secondary" href="#">Cool stuff</a></li>
                        <li><a className="link-secondary" href="#">Random feature</a></li>
                        <li><a className="link-secondary" href="#">Team feature</a></li>
                        <li><a className="link-secondary" href="#">Stuff for developers</a></li>
                        <li><a className="link-secondary" href="#">Another one</a></li>
                        <li><a className="link-secondary" href="#">Last time</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Resources</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="link-secondary" href="#">Resource name</a></li>
                        <li><a className="link-secondary" href="#">Resource</a></li>
                        <li><a className="link-secondary" href="#">Another resource</a></li>
                        <li><a className="link-secondary" href="#">Final resource</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-12 col-md">
                <img xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mb-2" role="img" viewBox="0 0 24 24" /><title>Product</title><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
                <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
            </div>
        </div>
    )
}
