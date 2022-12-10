import { compact } from 'lodash';
import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context';
import { updateCardsSameList } from '../../store/actions';

function Card({ card, onUpdateCardsSameList }) {
    const { id, content } = card
    // console.log(onUpdateCardsSameList);
    const [value, setValue] = useState(content)

    const { dispatchList, initialData } = useContext(Context)

    useEffect(() => {
        setValue(content)
    }, [card]);

    const handleChangeCardContent = (e) => {
        setValue(e.target.value)
    }





    // DnD


    const handleDragStart = e => {
        e.stopPropagation()

        // var img = new Image();
        // img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        // e.dataTransfer.setDragImage(img, 0, 0);
        const currentTarget = e.currentTarget
        const listWrapperEl = currentTarget.closest(".list-content")

        e.dataTransfer.setData("text", currentTarget.id + "&" + listWrapperEl.id);





    }

    const handleOnDrag = e => {
        e.stopPropagation()


    }

    const handleDragEnd = e => {
        e.stopPropagation()
    }

    const handleOnDrop = e => {
        e.preventDefault()
        // e.stopPropagation()
        const data = e.dataTransfer.getData("text")

        if (!data.includes("&")) return
        const dropCardTarget = e.currentTarget
        const dropListTarget = dropCardTarget.closest(".list-content")
        const [dragCardId, dragListId] = data.split("&")
        const dropCardId = dropCardTarget.id
        const dropListId = dropListTarget.id

        // console.log(dragCardId, dragListId, dropCardId, dropListId)

        // do nothing if drop and drag is the same element
        if (dragCardId == dropCardId) return

        // if card is dnd within the same list
        if (dragListId == dropListId) {
            console.log("Same col")

            // dispatchList(updateCardsSameList({
            //     listId: dropListId,
            //     dragCardId,
            //     dropCardId
            // }))

            // lift up state back to List component
            onUpdateCardsSameList({
                listId: dropListId,
                dragCardId,
                dropCardId
            })

        } else {
            console.log("Diff col")
        }

        // const targetListId = e.currentTarget.closest(".list-content").id

    }



    ////////////////////////////////////////
    const handleAddDraggable = (e) => {
        e.stopPropagation()
        e.currentTarget.closest(".list-card-wrapper").setAttribute("draggable", true)
    }

    const handleRemoveDraggable = (e) => {
        e.stopPropagation()
        e.currentTarget.closest(".list-card-wrapper").setAttribute("draggable", false)
    }

    return (
        <div className='list-card-wrapper'
            id={id}
            // draggable
            onDragStart={handleDragStart}
            onDrag={handleOnDrag}
            onDragEnd={handleDragEnd}
            // onClick={handleOnClick}
            // onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            onMouseDown={handleAddDraggable}
            onMouseUp={handleRemoveDraggable}

        >
            <textarea className="list-card-detail" value={value} onChange={handleChangeCardContent} />
        </div>
    )
}

export default Card