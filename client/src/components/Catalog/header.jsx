import React, { useState } from 'react'

const Header = ({ headers, onSorting }) => {

    const [sortingField, setSortingField] = useState("")
    const [sortingOrder, setSortingOrder] = useState("asc")

    const onSortingChange = field => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc"
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order)
    }


    return (
        <div className="sorts">
            <div className="sortItem">
                {headers.map(({ name, field, sortable }) => (
                    <div className="sorting" key={name} onClick={() => sortable ? onSortingChange(field) : null}>
                        {name}
                        {sortingField && sortingField === field && (
                            <div className="arrow">{sortingOrder === "asc" ? '⬇' : "⬆"}</div>
                        )}
                    </div>))}
            </div>
        </div>
    )
}

export default Header
