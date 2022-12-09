import React, { useState, useEffect } from 'react'

function ListCard({ card }) {
    const { id, content } = card
    const [value, setValue] = useState(content)

    useEffect(() => {
        setValue(content)
    }, [card]);

    const handleChangeCardContent = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className='list-card-wrapper' id={id}>
            <textarea className="list-card-detail" value={value} onChange={handleChangeCardContent} />
        </div>
    )
}

export default ListCard