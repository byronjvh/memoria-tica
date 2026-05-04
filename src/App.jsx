import { useState } from 'react'
import './App.css'
import Map from './components/Map'
import Arrow from './components/Arrow'

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
      <div className='hero ' onClick={clickOutSide}>
        <div className='flex max-w-270 mx-auto pt-10 px-2 gap-4'>
          <div className='flex-1 max-w-104 max-h-125 flex flex-col pt-4 gap-4' >
            <h1 className='text-balance text-white'>
              Descubre las memorias visuales de Costa Rica
            </h1>
            <p className='text-gray-700'>
              Imágenes, lugares y memorias organizadas por provincia y cantón.
            </p>
            <div className='bg-white p-2 rounded-md flex flex-col gap-2'>
              <select name="" id="" className='border border-gray-300 w-full rounded'>
                <option value="0">Selecciona una provincia</option>
                <option value="1">San José</option>
                <option value="2">Alajuela</option>
                <option value="3">Cartago</option>
                <option value="4">Heredia</option>
                <option value="5">Guanacaste</option>
                <option value="6">Puntarenas</option>
                <option value="7">Limón</option>
              </select>
              <select name="" id="" className='border border-gray-300 w-full rounded'>
                <option value="0">Selecciona un cantón</option>
              </select>
            </div>
            <button className='w-max flex items-center gap-1 font-bold px-4 py-3 bg-orange-400 rounded-md uppercase cursor-pointer border-2 border-white text-white hover:-translate-y-0.5 transition-transform duration-200 ease-out'>Explorar museo digital <Arrow size={22} /></button>
          </div>
          <div className='flex-1 max-w-125 max-h-125 mx-auto overflow-hidden flex justify-center items-center'>
            <Map updateSelected={updateSelectedProvince} selectedProvince={selectedProvince} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
