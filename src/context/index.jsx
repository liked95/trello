import { initial } from 'lodash'
import React, { useReducer, useEffect, useState } from 'react'
import { createContext } from 'react'
import listReducer, { initialListState } from '../store/reducer'
import { getFromLocal, saveToLocal } from '../utils'
import axios from 'axios'

export const Context = createContext()

function AppProvider({ children }) {
    const [data, setData] = useState(initialListState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get("http://localhost:5500/api/item")
                setData(res.data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    // console.log(data)
    const [initialData, dispatchList] = useReducer(listReducer, data)
    return (
        <Context.Provider value={{ initialData, dispatchList }}>
            {children}
        </Context.Provider>
    )
}

export default AppProvider