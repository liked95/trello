import React, { useState } from 'react'

function ListCard({ card }) {
    const { id, content } = card
    const [value, setValue] = useState(content)

    const handleChangeCardContent = (e) => {
        setValue(e.target.value)
    }
    
    return (
        <div className='list-card-wrapper'>
            <textarea className="list-card-detail" value={value} onChange={handleChangeCardContent} />
        </div>
    )
}

export default ListCard