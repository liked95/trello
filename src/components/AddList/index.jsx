import React, { useState, useRef, useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { createListId } from '../../utils';
import axios from 'axios';

function AddList({onAddList}) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const addListRef = useRef()


    useOnClickOutside(addListRef, () => setIsOpen(false))

    const handleOpenAddList = () => {
        setIsOpen(true)
    }

    const handleCloseAddList = () => {
        setIsOpen(false)
    }

    const handleAddList = () => {
        if (!title.trim()) return

        const newList = {
            title: title.trim(),
            cards: [],
            cardOrder: [],
        }

        onAddList(newList)

        setTitle("")
    }

    const handleKeyDownTitleInput = e => {
        if (e.keyCode == 13) {
            e.preventDefault()
            handleAddList()
        }

    }

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
                        <input type="text" className='add-list-title' placeholder='Enter list title...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDownTitleInput} />
                    </div>

                    <div className='second-row'>
                        <button className="add-list-btn" onClick={handleAddList}>Add list</button>
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