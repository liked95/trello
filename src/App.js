import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import List from './components/List';
import AddList from './components/AddList';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from './utils';



function App() {
  const  {initialData}  = useContext(Context)
  
  console.log(initialData)
  const [boardLists, setBoardLists] = useState([])

  useEffect(() => {
    // initialData.lists.sort((a, b) => initialData.listOrder.indexOf(a.id) - initialData.listOrder.indexOf(b.id))
    reorder(initialData.lists, initialData.listOrder, 'id')
    setBoardLists(initialData.lists)
  }, [])


  const handleDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <Droppable droppableId='dashboard'>
          {(provided) => (
            <div className='dashboard' {...provided.droppableProps} ref={provided.innerRef}>

              {boardLists.map((list, index) => {
                return (
                  <Draggable key={`${list.id}`} draggableId={`${list.id}`} index={index}>
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
