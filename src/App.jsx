import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context';
import axios from 'axios'
import _ from 'lodash'


import { reorder } from './utils';



function App() {
  const { initialData } = useContext(Context)

  // console.log(initialData)
  const [boardLists, setBoardLists] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get("http://localhost:5500/api/item")
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
      setBoardLists([...boardLists, res.data])
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteList = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      let newBoardList = _.cloneDeep(boardLists).filter(list => list._id != id)
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


  return (
    <div className="App">
      <div className='dashboard'  >
        <div className='dashboard-columns'>
          {boardLists.map((list, index) => <List
            list={list}
            key={list._id}
            onDeleteList={handleDeleteList}
            onAddCard={handleAddNewCard}
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
