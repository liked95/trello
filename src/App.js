import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context';


import { reorder } from './utils';



function App() {
  const { initialData } = useContext(Context)

  // console.log(initialData)
  const [boardLists, setBoardLists] = useState([])

  useEffect(() => {
    // let lists = reorder(initialData.lists, initialData.listOrder, 'id')
    console.log("rrerenderrr")
    setBoardLists(reorder(initialData.lists, initialData.listOrder, 'id'))
  }, [initialData.listOrder, initialData.lists])

  // const handleOnChangeListOrder = (newListOrder) => {
  //   // let lists = reorder(initialData.lists, newListOrder, 'id')
  //   setBoardLists(newListOrder)
  //   // console.log(lists);
  //   // console.log(newListOrder);
  // }


  return (
    <div className="App">
      <div className='dashboard'  >
        <div className='dashboard-columns'>
          {boardLists.map((list, index) => <List list={list} key={list.id}  />)}
        </div>
        <AddList />
      </div>
    </div>


  );
}

export default App;
