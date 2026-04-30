import { useState } from 'react'
import './App.css'
import Map from './components/Map'

function App() {
  const [selectedProvince, setSelectedProvince] = useState(0)

  const updateSelectedProvince = (num) => {
    setSelectedProvince(num)
  }

  const clickOutSide = (e) => {
    e.stopPropagation()
    setSelectedProvince(0)
  }

  return (
    <>
      <div className='hero w-full p-2' onClick={clickOutSide}>
        <div className='max-w-125 max-h-125 mx-auto overflow-hidden flex justify-center items-center'>
          <Map updateSelected={updateSelectedProvince} selectedProvince={selectedProvince} />
        </div>
      </div>
    </>
  )
}

export default App
