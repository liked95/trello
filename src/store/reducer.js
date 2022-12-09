import { ADD_CARD, ADD_LIST, DELETE_LIST, UPDATE_LIST_ORDER } from "./constants"
import _ from 'lodash'
export const initialListState = {
    listOrder: ['list-1', 'list-2', 'list-3'],
    lists: [
        {
            id: 'list-1',
            title: "My title 1",
            cardOrder: ['card-2', 'card-1', 'card-3'],
            cards: [
                {
                    id: 'card-1',
                    listId: 'list-1',
                    content: "First 1",
                },
                {
                    id: 'card-2',
                    listId: 'list-1',
                    content: "First 2",
                },
                {
                    id: 'card-3',
                    listId: 'list-1',
                    content: "First 3",
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
                    content: "Second 4",
                },
                {
                    id: 'card-5',
                    listId: 'list-2',
                    content: "Second 5",
                },
                {
                    id: 'card-6',
                    listId: 'list-2',
                    content: "Second 6",
                },
            ]
        },
        {
            id: 'list-3',
            title: "My title 3",
            cardOrder: ['card-8', 'card-7', 'card-9', 'card-10', 'card-11'],
            cards: [
                {
                    id: 'card-7',
                    listId: 'list-3',
                    content: "Third 7",
                },
                {
                    id: 'card-8',
                    listId: 'list-3',
                    content: "Third 8",
                },
                {
                    id: 'card-9',
                    listId: 'list-3',
                    content: "Third 9",
                },
                {
                    id: 'card-10',
                    listId: 'list-3',
                    content: "Third 10",
                },
                {
                    id: 'card-11',
                    listId: 'list-3',
                    content: "Third 11",
                },
            ]
        }
    ]
}

const listReducer = (state, action) => {
    let clonedState = _.cloneDeep(state)
    switch (action.type) {
        case ADD_LIST: {
            const listOrder = [...clonedState.listOrder, action.payload.id]
            const lists = _.cloneDeep(clonedState.lists)
            lists.push({
                id: action.payload.id,
                title: action.payload.title,
                cards: action.payload.cards,
                cardOrder: action.payload.cardOrder,

            })
            console.log({ ...clonedState, listOrder, lists })
            return { ...clonedState, listOrder, lists }
        }

        case DELETE_LIST: {
            let listId = action.payload
            let listOrderIdx = clonedState.listOrder.indexOf(listId)
            const listOrder = [...clonedState.listOrder].splice(listOrderIdx, 1)
            let listIdx = clonedState.lists.indexOf(listId)
            const lists = _.cloneDeep(clonedState.lists)
            lists.splice(listIdx, 1)

            return { ...clonedState, listOrder, lists }
        }

        case ADD_CARD: {
            console.log(action.payload)
            const { listId, id, content } = action.payload
            const lists = _.cloneDeep(clonedState.lists)

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

            return {...clonedState, lists}
        }

        case UPDATE_LIST_ORDER: {
            console.log(action.payload)
            let newState = {...clonedState, listOrder: action.payload}
            console.log("newState ", newState);
            return newState
        }


        default:
            return state
    }
}



export default listReducer 
