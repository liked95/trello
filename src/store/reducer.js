import { ADD_CARD, ADD_LIST, DELETE_LIST } from "./constants"

export const initialListState = [
    {
        id: 1,
        title: "My title 1",
        cards: [
            { id: 1, content: "Lorem 1" },
            { id: 2, content: "Lorem 2" },
            { id: 3, content: "Lorem 3" },
]
    },
    {
        id: 2,
        title: "My title 2",
        cards: [
            { id: 1, content: "Anonymouss 1" },
            { id: 2, content: "Anonymouss 2" },
        ]
    }
]

const listReducer = (state, action) => {
    switch (action.type) {
        case ADD_LIST:
            return [...state, action.payload]

        case DELETE_LIST:
            return state.filter(list => list.id != action.payload)

        case ADD_CARD:
            console.log(action.payload)
            const { id, content, listId } = action.payload

            return state.map(list => {
                if (list.id != listId) return list
                // if listId is match, push newCard to list.cards
                list.cards = [...list.cards, { id, content }]
                return { ...list, cards: list.cards }
            })

        default:
            return state
    }
}



export default listReducer 
