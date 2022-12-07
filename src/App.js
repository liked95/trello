import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';



function App() {
  return (
    <div className="App">
      <div className='dashboard'>
        <List />
        <List />
        <AddList />
      </div>
    </div>
  );
}

export default App;
