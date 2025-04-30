import { DragEvent, useState } from 'react'
import './App.css'

function App() {
  const [items,setItems] = useState([
    {id: 1, content: "Item 1"},
    {id: 2, content: "Item 2"},
    {id: 3, content: "Item 3"},
    {id: 4, content: "Item 4"},
    {id: 5, content: "Item 5"},
  ])
  const [dragItemId,setDragItemId] = useState<number | null>(null);
  const [dragOverId,setDragOverId] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLLIElement>,id: number) => {
    setDragItemId(id);
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id.toString())
  }

  const handleEnd = () => {
    setDragItemId(null)
    setDragOverId(null)
  }

  const handleDragOver = (e: DragEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  }

  const handleDrop = (e: DragEvent<HTMLLIElement>, id: number) => {
    e.preventDefault();
    if(dragItemId === dragOverId) return;
    const draggedItemIndex = items.findIndex(item => item.id === dragItemId)
    const dropItemIndex = items.findIndex(item => item.id === id)

    const newState = [...items]
    const [removedItem] = newState.splice(draggedItemIndex,1)
    newState.splice(dropItemIndex, 0, removedItem)
    setItems(newState)
    setDragItemId(null)
    setDragOverId(null)
  }

  return(
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <ul style={{padding: '4px', width: '400px'}}>
        {items.map(item => (
          <li key={item.id}
          draggable='true'
          style={{background: 'skyblue', margin: '4px',border: '1px solid black', listStyleType:"none"}}
          onDragStart={(e) => handleDragStart(e,item.id)}
          onDragOver={(e) => handleDragOver(e,item.id)}
          onDragEnd={() => handleEnd()}
          onDrop={(e) => handleDrop(e,item.id)}
          >
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
