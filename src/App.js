import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext } from 'react';
import { Context } from './context';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function App() {
  const { lists } = useContext(Context)
  // console.log(lists)


  const handleDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <Droppable droppableId='dashboard'>
          {(provided) => (
            <div className='dashboard' {...provided.droppableProps} ref={provided.innerRef}>

              {lists.map((list) => {
                return (
                  <Draggable key={list.id} draggableId={list.id.toString()} index={list.id}>
                    {(provided) => (
                      <div className='list-wrapper' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <List list={list} />

                      </div>
                    )}
                  </Draggable>
                )
              })}
              <AddList />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
