import React from 'react'
import Catalogo from '../../components/Catalogo/Catalogo'
import Footer from '../../components/Footer/Footer'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin'



const CompleteCatalog = () => {
    return (
        <div className="tracking-wide font-bold">
            <NavBarAdmin />
            <Catalogo />
            <Footer />
        </div>
    )
}

export default CompleteCatalog
