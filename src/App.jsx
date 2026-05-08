import { useState } from 'react'
import './App.css'
import Map from './components/Map'
import { Arrow, Diamond, Search, User } from './components/Icons'
import IconButton from './components/IconButton'

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
      <header>
        <div className='max-w-260 mx-auto py-4 px-2 flex justify-between'>
          <a href="/">
            <h2 className='text-white text-xl'>
              Memoria Tica
            </h2>
          </a>
          <div className='flex gap-6'>
            <IconButton>
              <Search />Buscar
            </IconButton>
            <IconButton>
              <Diamond /> Mis joyitas
            </IconButton>
            <IconButton>
              <User />Byron
            </IconButton>
          </div>
        </div>
      </header>
      <div className='hero ' onClick={clickOutSide}>
        <div className='flex max-w-250 mx-auto pt-10 px-2 justify-between'>
          <div className='flex-1 max-w-104 max-h-125 flex flex-col pt-4 gap-6' >
            <div className='flex flex-col gap-2'>
              <h1 className='text-balance text-white'>
                Descubre las memorias visuales de Costa Rica
              </h1>
              <p className='text-gray-700 text-lg'>
                Imágenes, lugares y memorias organizadas por provincia y cantón.
              </p>
            </div>
            <div className='bg-white p-0.5 rounded-md flex flex-col gap-2'>
              <select name="" id="" className='border-2 border-sky-300 w-full rounded p-2 cursor-pointer'>
                <option value="0">Selecciona una provincia</option>
                <option value="1">San José</option>
                <option value="2">Alajuela</option>
                <option value="3">Cartago</option>
                <option value="4">Heredia</option>
                <option value="5">Guanacaste</option>
                <option value="6">Puntarenas</option>
                <option value="7">Limón</option>
              </select>
            </div>
            <div className='bg-white p-0.5 rounded-md flex flex-col gap-2'>
              <select name="" id="" className='border-2 border-sky-300 w-full rounded p-2 cursor-pointer'>
                <option value="0">Selecciona un cantón</option>
              </select>
            </div>
            <button className='w-max hover:brightness-110 text-sm flex items-center gap-1 font-bold px-4 py-3 bg-orange-400 rounded-md uppercase cursor-pointer border-2 border-white text-white hover:-translate-y-0.5 transition duration-200 ease-out'>Explorar museo digital <Arrow size={22} /></button>
          </div>
          <div className='flex-1 max-w-125 max-h-125 overflow-hidden flex justify-center items-center'>
            <Map updateSelected={updateSelectedProvince} selectedProvince={selectedProvince} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
