import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';



function App() {
  return (
    <div className="App">
      <div className='dashboard'>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        
      </div>
    </div>
  );
}

export default App;
