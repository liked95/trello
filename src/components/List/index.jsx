import React, { useContext, useRef, useState, useEffect } from 'react'
import { Context } from '../../context'
import { addCard, deleteList } from '../../store/actions'
import ListCard from '../ListCard'
import CloseIcon from '@mui/icons-material/Close';
import useClickOutsideHandler from '../../hooks/useOnClickOutside';
import { createListId, reorder } from '../../utils';


function List({ list }) {
    // console.log('rerender')
    const { title, cards, id, cardOrder } = list
    console.log(list)

    const { dispatchList } = useContext(Context)

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

    return (

        <div className="list-content">
            <div className="list-heading">
                <h2 className="list-header-name">
                    {title}
                </h2>
            </div>

            <div className="list-cards">
                {boardCards.map((card, index) => <ListCard key={index} card={card} />)}
            </div>

            {!isCardShown && <div className="add-card-section">
                <button className="add-btn" onClick={handleShowAddCardControl}>+ Add a card</button>
                <button className="del-btn" onClick={() => handleDeleteList(id)}>Delete</button>
            </div>}

            {isCardShown && <div className="add-card-control" ref={addCardPanelRef}>
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
            </div>}
        </div>


    )
}

export default List