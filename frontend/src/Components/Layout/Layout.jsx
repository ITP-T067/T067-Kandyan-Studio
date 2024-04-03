import React from 'react'
import Header from '../Common/Header'
import Router from '../Common/Router'
import Footer from '../Common/Footer'
import Navbar from '../Common/Navbar'
import '../../Styles/style.css'


const Layout = () => {
    return (
            <>
            <Header />
            <Navbar />
            <Router />
            <Footer />
            </>
    )
}

export default Layout;