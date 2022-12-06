import React from 'react'
import ListCard from '../ListCard'

function List() {
    return (
        <div className='list-wrapper'>
            <div className="list-content">
                <div className="list-heading">
                    <h2 className="list-header-name">
                        List title df
                    </h2>
                </div>
                <div className="list-cards">
                    <ListCard/>
                    <ListCard/>
                    <ListCard/>
                </div>
            </div>
        </div>
    )
}

export default List