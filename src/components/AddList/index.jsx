import React, { useState, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useOnClickOutside from '../../hooks/useOnClickOutside';

function AddList() {
    const [isOpen, setIsOpen] = useState(false)
    const addListRef = useRef()

    const handleOpenAddList = () => {
        setIsOpen(true)
    }

    const handleCloseAddList = () => {
        setIsOpen(false)
    }

    useOnClickOutside(addListRef, () => setIsOpen(false))

    return (
        <div className='list-wrapper'>
            <div className={`add-list-content ${isOpen ? 'open' : ''}`} ref={addListRef}>
                {!isOpen && <div className="list-heading" onClick={handleOpenAddList}>
                    <h2 className="list-header-name">
                        + Add another list
                    </h2>
                </div>}
                <div className="add-list-control">
                    <div className='first-row'>
                        <input type="text" className='add-list-title' placeholder='Input list title' />
                    </div>

                    <div className='second-row'>

                        <button className="add-list-btn">Add list</button>
                        <button className="close-add-list-btn" onClick={handleCloseAddList}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddList