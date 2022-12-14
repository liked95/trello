import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context';
import axios from 'axios'
import _ from 'lodash'


import { reorder, updateOrder } from './utils';



function App() {
  const { initialData } = useContext(Context)

  // console.log(initialData)
  const [boardLists, setBoardLists] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get("http://localhost:5500/api/item")
        let order = await axios.get("http://localhost:5500/api/order")

        if (order.data.length > 0) {
          const listOrder = order.data[0].order
          reorder(res.data, listOrder, "_id")
        }

        setBoardLists(res.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  // const handleOnChangeListOrder = (newListOrder) => {
  //   // let lists = reorder(initialData.lists, newListOrder, 'id')
  //   setBoardLists(newListOrder)
  //   // console.log(lists);
  //   // console.log(newListOrder);
  // }

  const handleAddList = async (list) => {
    console.log(list)
    try {
      const res = await axios.post('http://localhost:5500/api/item', list)
      let order = await axios.get("http://localhost:5500/api/order")

      if (order.data.length > 0) {
        const listOrder = order.data[0].order
        const orderId = order.data[0]._id

        let orderRes = await axios.put(`http://localhost:5500/api/order/${orderId}`, {
          order: [...listOrder, res.data._id]
        })
      } else {
        let orderRes = await axios.post(`http://localhost:5500/api/order/`, {
          order: [res.data._id]
        })
      }


      setBoardLists([...boardLists, res.data])
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteList = async (id) => {
    try {
      let listRes = await axios.delete(`http://localhost:5500/api/item/${id}`)
      let newBoardList = _.cloneDeep(boardLists).filter(list => list._id != id)

      const deletedListId = listRes.data._id
      let order = await axios.get("http://localhost:5500/api/order")
      const listOrder = order.data[0].order
      const orderId = order.data[0]._id
      const idx = listOrder.indexOf(deletedListId)
      listOrder.splice(idx, 1)

      let orderRes = await axios.put(`http://localhost:5500/api/order/${orderId}`, {
        order: listOrder
      })

      setBoardLists(newBoardList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddNewCard = async (card) => {
    try {
      const cloneBoardLists = _.cloneDeep(boardLists)
      const list = cloneBoardLists.find(list => list._id == card.listId)
      list.cards.push(card)
      list.cardOrder.push(card.id)
      let res = await axios.put(`http://localhost:5500/api/item/${card.listId}`, list)

      setBoardLists(cloneBoardLists)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMoveLists = async (data) => {
    const { sourceListId, targetListId } = data
    let order = await axios.get("http://localhost:5500/api/order")
    const listOrder = order.data[0].order
    const orderId = order.data[0]._id



    updateOrder(sourceListId, targetListId, listOrder)


    const cloneBoardLists = _.cloneDeep(boardLists)
    reorder(cloneBoardLists, listOrder, "_id")
    setBoardLists(cloneBoardLists)

    let orderRes = await axios.put(`http://localhost:5500/api/order/${orderId}`, {
      order: listOrder
    })
  }

  const handleMoveCardsBetweenLists = async (data) => {
    
  }




  return (
    <div className="App">
      <div className='dashboard'  >
        <div className='dashboard-columns'>
          {boardLists.map((list, index) => <List
            list={list}
            key={list._id}
            onDeleteList={handleDeleteList}
            onAddCard={handleAddNewCard}
            onMoveLists={handleMoveLists}
            onHandleMoveCardsBetweenLists={handleMoveCardsBetweenLists}

            // onHandleGetDragList={handleGetDragList}
            // onHandleDeleteDragCard={handleDeleteDragCard}
            // deleteData={deleteData}
            order={index + 1}
          />)}
        </div>
        <AddList onAddList={handleAddList} />
      </div>
    </div>


  );
}

export default App;
