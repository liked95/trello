import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext } from 'react';
import { Context } from './context';



function App() {
  const { lists } = useContext(Context)
  console.log(lists)
  return (
    <div className="App">
      <div className='dashboard'>

        {lists.map((list) => <List key={list.id} list={list} />)}
        <AddList />
      </div>
    </div>
  );
}

export default App;
