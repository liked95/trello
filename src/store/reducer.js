import { ADD_CARD, ADD_LIST, DELETE_LIST } from "./constants"
import _ from 'lodash'
export const initialListState = {
    listOrder: ['list-2', 'list-1'],
    lists: [
        {
            id: 'list-1',
            title: "My title 1",
            cardOrder: ['card-2', 'card-3', 'card-1'],
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
        case ADD_LIST: {
            const listOrder = [...state.listOrder, action.payload.id]
            const lists = _.cloneDeep(state.lists)
            lists.push({
                id: action.payload.id,
                title: action.payload.title,
                cards: action.payload.cards,
                cardOrder: action.payload.cardOrder,

            })
            console.log({ ...state, listOrder, lists })
            return { ...state, listOrder, lists }
        }

        case DELETE_LIST: {
            let listId = action.payload
            let listOrderIdx = state.listOrder.indexOf(listId)
            const listOrder = [...state.listOrder].splice(listOrderIdx, 1)
            let listIdx = state.lists.indexOf(listId)
            const lists = _.cloneDeep(state.lists)
            lists.splice(listIdx, 1)

            return { ...state, listOrder, lists }
        }

        case ADD_CARD: {
            console.log(action.payload)
            const { listId, id, content } = action.payload
            const lists = _.cloneDeep(state.lists)
            
            lists.map(list => {
                if (list.id !== listId) {
                    return list
                }

                // if listId is matched
                list.cards.push({
                    id,
                    listId,
                    content,
                })

                list.cardOrder.push(id)
                return list
            })

            console.log(lists)

            return {...state, lists}
        }
        default:
            return state
    }
}



export default listReducer 
