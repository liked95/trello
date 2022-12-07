import { ADD_LIST } from "./constants"
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