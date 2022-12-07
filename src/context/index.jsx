import React, { useReducer } from 'react'
import { createContext } from 'react'
import listReducer, { initialListState } from '../store/reducer'

export const Context = createContext()

function AppProvider({ children }) {

    const [initialData, dispatchList] = useReducer(listReducer, initialListState)
    return (
        <Context.Provider value={{ initialData, dispatchList }}>
            {children}
        </Context.Provider>
    )
}

export default AppProvider