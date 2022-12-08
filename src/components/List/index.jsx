import React, { useContext, useRef, useState, useEffect } from 'react'
import { Context } from '../../context'
import { addCard, deleteList } from '../../store/actions'
import ListCard from '../ListCard'
import CloseIcon from '@mui/icons-material/Close';
import useClickOutsideHandler from '../../hooks/useOnClickOutside';
import { createListId, reorder } from '../../utils';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function List({ list }) {
    // console.log('rerender')
    const { title, cards, id, cardOrder } = list
    // console.log(list)

    const { dispatchList, initialData } = useContext(Context)

    const [cardValue, setCardValue] = useState("")
    const [isCardShown, setIsCardShown] = useState(false)
    const [boardCards, setBoardCards] = useState([])

    useEffect(() => {
        reorder(cards, cardOrder, 'id')
        setBoardCards(cards)
    }, [list])


    const cardInputRef = useRef()

    // handle close when click outside
    const addCardPanelRef = useRef()
    useClickOutsideHandler(addCardPanelRef, () => setIsCardShown(false))

    const handleDeleteList = id => {
        dispatchList(deleteList(id))
    }

    const handleShowAddCardControl = () => {
        setIsCardShown(true)

        if (cardInputRef.current) {
            cardInputRef.current.focus()
        }
    }


    const handleAddCard = (listId) => {
        if (!cardValue.trim()) return

        const newCard = {
            listId: listId,
            id: 'card-' + createListId(),
            content: cardValue.trim()
        }

        dispatchList(addCard(newCard))
        setCardValue("")
    }

    const handleHideAddCardControl = () => {
        setIsCardShown(false)
    }

    const handleKeyDownCardInput = (e) => {
        if (e.keyCode == 13) {
            handleAddCard(id)
        }
    }



    // DnD
    const listWrapperRef = useRef()

    const [isMouseDown, setIsMouseDown] = useState(false)
    const [draggable, setDraggable] = useState(false)

    const handleDragStart = (e) => {
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);

        e.dataTransfer.setData("text", e.target.id);

    }

    const handleOnDrag = e => {
        e.target.style.position = 'fixed'
        e.target.style.width = '272px'
        e.target.style.left = e.clientX + 'px'
        e.target.style.top = e.clientY + 'px'
        e.target.style.rotate = "3deg"
        e.target.style.zIndex = 100

    }


    const handleDragEnd = (e) => {
        e.target.style.rotate = "0deg"
        e.target.style.position = 'relative'
        e.target.style.left = 0
        e.target.style.top = 0
        e.target.style.zIndex = 0
    }

    const handleOnDrop = (e) => {
        // e.preventDefault()
        // e.target.closest(".list-content").style.display = 'none';
        // console.log(initialData.listOrder)
        console.log("Source: ", e.dataTransfer.getData("text"))
        console.log("Target: ", e.target.closest(".list-content").id)

        // handle sorting list ID logic

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        // console.log('data duoc get la', e.dataTransfer);
        console.log('droppable element la ', e.target.closest(".list-content").id);

    }

    const handleOnClick = e => {
        const value = e.target.getBoundingClientRect()
        console.log('rect', value.x, value.y)
        console.log('mouse', e.clientX, e.clientY)
    }

    useEffect(() => {
        document.addEventListener('mouseup', (e) => {
            e.preventDefault()
            console.log("Tha r ne")
            setDraggable(false)
        })
    }, [])




    return (
        <div className='list-wrapper droppable-columns' >
            < div className="list-content"
                ref={listWrapperRef}
                draggable={draggable}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleOnDrag}
                onClick={handleOnClick}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                id={id}
            >
                <div className="list-heading"
                    onMouseDown={(e => setDraggable(true))}
                    onMouseUp={e => setDraggable(false)}
                // onMouseMove={handleOnMouseMove}
                >
                    <h2 className="list-header-name">
                        {title}
                    </h2>
                </div>

                <div className="list-cards">
                    {boardCards.map((card, index) => <ListCard key={index} card={card} />)}
                </div>

                {
                    !isCardShown && <div className="add-card-section">
                        <button className="add-btn" onClick={handleShowAddCardControl}>+ Add a card</button>
                        <button className="del-btn" onClick={() => handleDeleteList(id)}>Delete</button>
                    </div>
                }

                {
                    isCardShown && <div className="add-card-control" ref={addCardPanelRef}>
                        <div className='first-row'>
                            <textarea type="text" className='add-card-title' placeholder='Enter a title  for this card...'
                                ref={cardInputRef}
                                value={cardValue}
                                onChange={(e) => setCardValue(e.target.value)}
                                onKeyDown={handleKeyDownCardInput} />
                        </div>

                        <div className='second-row'>
                            <button className="add-list-btn" onClick={() => handleAddCard(id)}>Add card</button>
                            <button className="close-add-list-btn" onClick={handleHideAddCardControl}>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                }

            </div >
        </div >
    )
}

export default List 