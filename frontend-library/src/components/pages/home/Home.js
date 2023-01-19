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

    //console.log(productList)

    return (
        <>
            <Navbar />
            <div className='main-container'>
                <HomeBanner />
                <HomeInformation />
                <h2 className='title-about' style={{ textAlign: 'center', padding: '1em' }}> Nuestros Productos </h2>
                <div className="container-list position-relative">

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
                <Footer />
            </div>
        </>
    )
}
