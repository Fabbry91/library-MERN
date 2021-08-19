import React, { useEffect } from 'react'
import { Footer } from '../../ui/Footer'
import { Navbar } from '../../ui/Navbar'
import { HomeBanner } from './HomeBanner'
import { HomeInformation } from './HomeInformation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticulo } from '../../../redux/actions/articuloActions'
import { Products } from '../Products'
import { Loading } from '../../ui/Loading'
import { MsgError } from '../../ui/MsgError'


export const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.art.articulos)
    const { loading, msgError } = useSelector((state) => state.ui)

    useEffect(() => {
        dispatch(getAllArticulo())
    },[dispatch])

    return (
        <div>
            <Navbar />
            <HomeBanner />
            <div className="b-example-divider"></div>
            <HomeInformation />
            <div className="b-example-divider"></div>

            <div className="container py-5">

                {
                    loading ? (
                        <Loading />
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
