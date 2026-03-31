import { useState } from 'react'
import './App.css'
import Map from './components/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-140 flex justify-center items-center'>
        <Map />
      </div>
    </>
  )
}

export default App
