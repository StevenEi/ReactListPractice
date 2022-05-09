import React from 'react'
import LineItem from "./LineItem"

const ItemList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map((item) => (
               <LineItem
                    key={item.id} 
                    items={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
               />
            ))}
        </ul>
    )
}

export default ItemList