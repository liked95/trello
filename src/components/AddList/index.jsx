import React, { useState } from 'react'

function AddList() {
    const [isActive, setIsActive] = useState(true)
    return (
        <div className='list-wrapper'>
            <div className="add-list-content">
                <div className="list-heading">
                    <h2 className="list-header-name">
                        + Add another list
                    </h2>
                </div>
                <div className="add-list-control">
                    <h2 className="list-header-name">
                        + Add another list
                    </h2>
                </div>

            </div>
        </div>
    )
}

export default AddList