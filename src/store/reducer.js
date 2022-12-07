import { ADD_CARD, ADD_LIST, DELETE_LIST } from "./constants"

export const initialListState = {
    listOrder: ['list-2', 'list-1'],
    lists: [
        {
            id: 'list-1',
            title: "My title 1",
            cardOrder: ['card-1', 'card-2', 'card-3'],
            cards: [
                {
                    id: 'card-1',
                    listId: 'list-1',
                    content: "Lorem 1",
                },
                {
                    id: 'card-2',
                    listId: 'list-1',
                    content: "Lorem 2",
                },
                {
                    id: 'card-3',
                    listId: 'list-1',
                    content: "Lorem 3",
                },
            ]
        },
        {
            id: 'list-2',
            title: "My title 2",
            cardOrder: ['card-5', 'card-4', 'card-6'],
            cards: [
                {
                    id: 'card-4',
                    listId: 'list-2',
                    content: "Anonymous 4",
                },
                {
                    id: 'card-5',
                    listId: 'list-2',
                    content: "Anonymous 5",
                },
                {
                    id: 'card-6',
                    listId: 'list-2',
                    content: "Anonymous 6",
                },
            ]
        }
    ]
}

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
