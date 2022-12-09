import React, { useState, useEffect } from 'react'

function Card({ card }) {
    const { id, content } = card
    const [value, setValue] = useState(content)

    useEffect(() => {
        setValue(content)
    }, [card]);

    const handleChangeCardContent = (e) => {
        setValue(e.target.value)
    }





    // DnD
    const handleDragStart = (e) => {
        // e.preventDefault()
        // e.stopPropagation()
        console.log(e)
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);

        e.dataTransfer.setData("text", e.target.id);

        const clonedEle = e.target.cloneNode(true)
        clonedEle.id = 'clone-card-element'
        clonedEle.style.display = "none"
        e.currentTarget.closest(".list-card").appendChild(clonedEle)
    }

    const handleOnDrag = e => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e)
        // style source element
        // e.target.style.display = "none"
        e.currentTarget.style.pointerEvents = 'none'


        // const diffX = onDragCoordDiff.dx
        // const diffY = onDragCoordDiff.dy
        // console.log(diffX, diffY)

        const sourceEle = e.currentTarget
        // console.log(e)
        sourceEle.style.position = 'fixed'
        sourceEle.style.width = '272px'
        sourceEle.style.left = e.clientX + 'px'
        sourceEle.style.top = e.clientY + 'px'
        sourceEle.style.rotate = "3deg"
        sourceEle.style.zIndex = 1000

        const cloneEle = document.getElementById("clone-element")
        cloneEle.style.display = "block"
        Array.from(cloneEle.querySelectorAll("div")).forEach(div => {
            // div.style.backgroundColor = "red"
            div.style.visibility = "hidden"
        })
        cloneEle.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
    }



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
            // onDragEnd={handleDragEnd}
            // onClick={handleOnClick}
            // onDragOver={handleDragOver}
            // onDrop={handleOnDrop}
            onMouseDown={handleAddDraggable}
            onMouseUp={handleRemoveDraggable}

        >
            <textarea className="list-card-detail" value={value} onChange={handleChangeCardContent} />
        </div>
    )
}

export default Card