import { ADD_LIST, UPDATE_CARDS_SAME_LIST, UPDATE_LIST_ORDER } from "./constants"
import { DELETE_LIST } from "./constants"
import { ADD_CARD } from "./constants"



export const addList = (list) => {
    return {
        type: ADD_LIST,
        payload: list
    }
}

export const deleteList = (listId) => {
    return {
        type: DELETE_LIST,
        payload: listId
    }
}



export const addCard = (card) => {
    return {
        type: ADD_CARD,
        payload: card
    }
}


export const updateListOrder = (listOrder) => {
    return {
        type: UPDATE_LIST_ORDER,
        payload: listOrder
    }
}

export const updateCardsSameList = (data) => {
    return {
        type: UPDATE_CARDS_SAME_LIST,
        payload: data
    }
}