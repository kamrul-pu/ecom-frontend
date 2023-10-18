import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'
import Footer from '../component/Footer'
const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout