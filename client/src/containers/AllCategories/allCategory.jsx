import React from 'react'
import CategoryTable from '../../components/CategoryTable/categoryTable'
import UniversalNavBar from '../../components/UniversalNavBar/universalNavBar'
import Footer from '../Footer/footer'

const AllCategory = () => {
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <CategoryTable />
            <Footer />
        </div>
    )
}

export default AllCategory
