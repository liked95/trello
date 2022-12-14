import React, { useContext, useRef, useState, useEffect, Component } from 'react'
import { Context } from '../../context'
import { addCard, deleteList, updateDropHeading, updateEmptyList, updateListOrder } from '../../store/actions'
import Card from '../Card'
import CloseIcon from '@mui/icons-material/Close';
import useClickOutsideHandler from '../../hooks/useOnClickOutside';
import { createListId, reorder, saveToLocal, updateOrder } from '../../utils';
import axios from 'axios'
import _ from 'lodash'



function List({
    list,
    onDeleteList,
    onAddCard,
    onMoveLists,
    onHandleMoveCardsBetweenLists
}) {
    // console.log(deleteData)
    const { title, cards, _id, cardOrder } = list
    const { dispatchList } = useContext(Context)


    console.log("clone  >>>", list)

    const [cardValue, setCardValue] = useState("")
    const [isCardShown, setIsCardShown] = useState(false)
    const [boardCards, setBoardCards] = useState([])

    useEffect(() => {
        reorder(cards, cardOrder, 'id')
        // console.log(cards)
        setBoardCards(cards)
    }, [list])



    // lift up state cards update in the same list

    const handleUpdateCardsSameList = async (obj) => {
        const cloneBoardCards = _.cloneDeep(boardCards)
        updateOrder(obj.dragCardId, obj.dropCardId, cardOrder)
        const updateCards = reorder(cloneBoardCards, cardOrder, 'id')
        setBoardCards(updateCards)

        const cloneList = _.cloneDeep(list)
        cloneList.cardOrder = cardOrder


        try {
            let res = await axios.put(`http://localhost:5500/api/item/${obj.listId}`, cloneList)
        } catch (error) {
            console.log(error)
        }
    }


    // const handleUpdateCardsSameList = (obj) => {
    //     updateOrder(obj.dragCardId, obj.dropCardId, cardOrder)
    //     const updateCards = reorder(_.cloneDeep(boardCards), cardOrder, 'id')
    //     setBoardCards(updateCards)

    //     // save to local without dispatching
    //     const data = _.cloneDeep(initialData)
    //     const list = data.lists.find(list => list.id == _id)
    //     list.cards = updateCards
    //     list.cardOrder = cardOrder
    //     saveToLocal("data", data)
    // }





    // lift up state cards update in the different lists
    const handleUpdateCardsBetweenLists = obj => {
        // console.log(obj)
        // console.log(_id)
        // const { dragCardId, dragListId, dropCardId, dropListId } = obj

        // // handle source list
        // if (dragListId == _id) {
        //     console.log(_id)
        // }

        // // onHandleGetDragList({ dragListId, dragCardId })

        // // should handle global state later
        // document.getElementById(dragCardId).remove()


        // const lists = _.cloneDeep(initialData.lists)
        // console.log(lists)
        // const dragCard = lists
        //     .find(list => list.id == dragListId).cards
        //     .find(card => card.id == dragCardId)

        // console.log(dragCard)

        // dragCard.listId = dropListId
        // console.log(dragCard)

        // const droppableCards = _.cloneDeep(boardCards)
        // // console.log(cards, dragCard)

        // // insert drag card after dropcard
        // const dropCardIndex = droppableCards.findIndex(card => card.id == dropCardId)
        // droppableCards.splice(dropCardIndex + 1, 0, dragCard)

        // console.log(droppableCards)
        // setBoardCards(droppableCards)
    }


    const cardInputRef = useRef()

    // handle close when click outside
    const addCardPanelRef = useRef()

    useClickOutsideHandler(addCardPanelRef, () => setIsCardShown(false))

    const handleDeleteList = id => {
        onDeleteList(id)
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

        onAddCard(newCard)

        setCardValue("")
    }

    const handleHideAddCardControl = () => {
        setIsCardShown(false)
    }

    const handleKeyDownCardInput = (e) => {
        if (e.keyCode == 13) {
            handleAddCard(_id)
        }
    }



    // DnD



    // const [draggable, setDraggable] = useState(false)
    // const [onDragCoordDif, setOnDragCoordDif] = useState({})

    var onDragCoordDiff = {}

    const handleDragStart = (e) => {
        console.log(e.currentTarget.id)


        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);

        e.dataTransfer.setData("text", e.currentTarget.id);

        const clonedEle = e.currentTarget.cloneNode(true)
        clonedEle.id = 'clone-element'
        clonedEle.style.display = "none"
        e.currentTarget.closest(".list-wrapper").appendChild(clonedEle)



        onDragCoordDiff = {
            dx: e.currentTarget.getBoundingClientRect().x - e.clientX,
            dy: e.currentTarget.getBoundingClientRect().y - e.clientY
        }


    }

    const handleOnDrag = e => {
        // console.log("List", e)

        // style source element
        // e.target.style.display = "none"
        e.currentTarget.style.pointerEvents = 'none'


        const diffX = onDragCoordDiff.dx
        const diffY = onDragCoordDiff.dy
        // console.log(diffX, diffY)

        const sourceEle = e.currentTarget
        // console.log(e)
        sourceEle.style.position = 'fixed'
        sourceEle.style.width = '272px'
        sourceEle.style.left = e.clientX + diffX + 'px'
        sourceEle.style.top = e.clientY + diffY + 'px'
        sourceEle.style.transform = 'rotate(3deg)'
        sourceEle.style.zIndex = 1000

        const cloneEle = document.getElementById("clone-element")
        cloneEle.style.display = "block"
        Array.from(cloneEle.querySelectorAll("div")).forEach(div => {
            // div.style.backgroundColor = "red"
            div.style.visibility = "hidden"
        })
        cloneEle.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
        // console.log("on drag list")
    }


    const handleDragEnd = (e) => {
        // allow user to drag again 
        e.currentTarget.style.pointerEvents = 'auto'
        // reset style
        e.currentTarget.style.transform = "none"
        e.currentTarget.style.position = 'initial'
        e.currentTarget.style.left = 0
        e.currentTarget.style.top = 0
        e.currentTarget.style.zIndex = 0
        e.currentTarget.style.display = "block"


        console.log('List drag end')

        //disable drag attribute when mouse release
        let allLists = Array.from(document.querySelectorAll(".list-content"))
        allLists.forEach(list => list.setAttribute('draggable', false))

        document.getElementById("clone-element").remove()

        // reset coordinate
        onDragCoordDiff = {}

    }

    const handleOnDrop = (e) => {
        e.preventDefault()



        // handle sorting list ID logic
        const sourceListId = e.dataTransfer.getData("text")
        // console.log(sourceListId)

        // if drag card into empty lists
        if (sourceListId.includes('&')) {

            if (cards.length == 0) {
                console.log('dead', sourceListId)
                const [dragCardId, dragListId] = sourceListId.split("&")

                dispatchList(updateEmptyList(
                    { dragCardId, dragListId, dropListId: _id }
                ))
            }

            return
        }

        const targetListId = e.currentTarget.closest(".list-content").id

        if (sourceListId && targetListId) {
            // console.log("on move List", sourceListId, targetListId) 
            onMoveLists({ sourceListId, targetListId })
            // console.log("here ", sourceListId, targetListId, cloneData.listOrder)

        }
    }

    const handleOnDropHeading = e => {
        if (cards.length == 0) {
            return
        }

        const data = e.dataTransfer.getData("text")
        if (!data.includes('&')) return
        const listId = e.target.closest(".list-content").id
        const [dragCardId, dragListId] = data.split("&")

        console.log("drop heading of the page", listId)
        console.log("drop heading data", data)

        dispatchList(updateDropHeading({
            dropListId: listId,
            dragCardId,
            dragListId,
        }))

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        // console.log('data duoc get la', e.dataTransfer);
        // console.log('droppable element la ');



    }

    const handleOnClick = e => {
        const value = e.currentTarget.getBoundingClientRect()
        // console.log('rect', value.x, value.y)
        // console.log('mouse', e.clientX, e.clientY)
    }

    useEffect(() => {
        document.addEventListener('mouseup', (e) => {
            e.preventDefault()
            // console.log("Tha r ne")
            // setDraggable(false)
        })
    }, [])


    // add draggable att to parent
    const handleAddDraggable = (e) => {
        e.currentTarget.closest(".list-content").setAttribute("draggable", true)
    }

    const handleRemoveDraggable = (e) => {
        e.currentTarget.closest(".list-content").setAttribute("draggable", false)
    }





    return (
        <div className='list-wrapper droppable-columns' >
            < div className="list-content"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleOnDrag}
                onClick={handleOnClick}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                id={_id}
            >
                <div className="list-heading"
                    onMouseDown={handleAddDraggable}
                    onMouseUp={handleRemoveDraggable}
                    onDrop={handleOnDropHeading}
                // onMouseMove={handleOnMouseMove}
                >
                    <h2 className="list-header-name">
                        {title}
                    </h2>
                </div>

                <div className="list-cards">
                    {boardCards.map((card, index) => <Card
                        key={card.id}
                        card={card}
                        onUpdateCardsSameList={handleUpdateCardsSameList}
                        onHandleMoveCardsBetweenLists={onHandleMoveCardsBetweenLists}

                    // onUpdateCardsBetweenLists={handleUpdateCardsBetweenLists}
                    // onHandleGetDragList={onHandleGetDragList}
                    />)}
                </div>

                {
                    !isCardShown && <div className="add-card-section">
                        <button className="add-btn" onClick={handleShowAddCardControl}>+ Add a card</button>
                        <button className="del-btn" onClick={() => handleDeleteList(_id)}>Delete</button>
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
                            <button className="add-list-btn" onClick={() => handleAddCard(_id)}>Add card</button>
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