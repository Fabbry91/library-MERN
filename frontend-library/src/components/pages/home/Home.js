import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo } from '../../../redux/actions/articuloActions'

import { HomeBanner } from './HomeBanner'
import { HomeInformation } from './HomeInformation'
import { Products } from '../products/Products'
import { Footer } from '../../ui/Footer'
import { Navbar } from '../../ui/Navbar'
import { Loading } from '../../ui/Loading'
import { MsgError } from '../../ui/MsgError'


export const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.art.articulos)
    const { loading, msgError } = useSelector((state) => state.ui)

    useEffect(() => {
        dispatch(getAllArticulo())
    }, [dispatch])

    console.log(productList)

    return (
        <div>
            <Navbar />
            <HomeBanner />
            <div className="b-example-divider"></div>
            <HomeInformation />
            <div className="b-example-divider"></div>

            <div className="container py-5 position-relative">

                {
                    loading ? (
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <Loading />
                        </div>
                    ) : msgError ? (
                        <MsgError />
                    ) : (

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                            {productList.map((prod) => (
                                <Products key={prod._id} product={prod}>
                                </Products>
                            ))}
                        </div>
                    )
                }

            </div>

            <div className="b-example-divider"></div>
            <Footer />
        </div>
    )
}
