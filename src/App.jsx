import { useEffect, useState } from 'react'
import './App.css'
import Map from './components/Map'
import { Arrow, HorizontalLine } from './components/Icons'
import CustomSelect from './components/CustomSelect'
import { paths as provinces } from "./MapPathArray"
import cantons from "./data/cantones.json"
import PrimaryButton from './components/PrimaryButton'
import Header from './components/Header'

function App() {
  const [selectedProvince, setSelectedProvince] = useState(0)
  const [selectedCanton, setSelectedCanton] = useState(0)
  const provinceList = provinces.map(el => ({ name: el.name, id: el.id }))
  const cantonList = Object.entries(cantons).map(el => ({ id: el[0], name: el[1].Nombre, province: el[1].Provincia, population: el[1]['Pop. (2008)'], area: el[1]['Área (km2)'] }))
  const filteredCantons = cantonList.filter(el => Number(el.province) === Number(selectedProvince))
  const updateSelectedProvince = (num) => {
    setSelectedProvince(num)
  }
  const updateSelectedCanton = (num) => {
    setSelectedCanton(num)
  }

  const clickOutSide = (e) => {
    e.stopPropagation()
    setSelectedProvince(0)
  }

  return (
    <>
      <div className='h-[90svh]'>
        <Header />
        <div className='hero'>
          <div className='flex max-w-250 mx-auto px-2 justify-between'>
            <div className={`flex-1 max-w-104 max-h-120.5 flex flex-col pt-4 gap-4 place-self-center transition-all duration-500 ease-out ${selectedProvince ? "pb-0" : "pb-10"}`} >
              <div className='flex flex-col gap-2'>
                <h1 className='text-balance text-text-light'>
                  Descubre las memorias visuales de Costa Rica
                </h1>
                <p className='text-text-light-soft text-lg leading-6'>
                  Imágenes, lugares y memorias organizadas por provincia y cantón.
                </p>
              </div>
              <div className='flex gap-4 text-sm'>
                <CustomSelect list={provinceList} updateSelected={updateSelectedProvince} selected={selectedProvince} />
                <CustomSelect list={filteredCantons} updateSelected={updateSelectedCanton} selected={selectedCanton} placeholder='Cantón' />
              </div>
              <div className={
                `
                  ${selectedProvince ? "h-max p-4" : "h-4.5 px-2 py-1 "} flex flex-col w-full justify-start overflow-hidden rounded-lg 
                  border-border-main bg-text-light-soft/45
                  border-2
                  transition-all duration-500 ease-out gap-2
                  province-preview
                
                `
              }>
                <div className={`${selectedProvince ? "hidden" : "flex"} gap-2`}>
                  <div className="h-1.5 w-24 rounded-full bg-text-light/80" />
                  <div className="h-1.5 w-12 rounded-full bg-text-light/50" />
                </div>

                <div className=''>
                  <div className='mb-4 border-b-2 border-text-light-soft'>
                    <h3 className='text-text-dark text-sm pb-2 uppercase tracking-wide'>Archivo histórico</h3>
                  </div>
                  <div className='flex items-center gap-3'>
                    <img className='aspect-video object-cover w-50 overflow-hidden rounded-lg' src="https://cdn.viralagenda.com/images/events/c2f9af0c265a95474071537154fac1d2-large.jpg" alt={`${selectedCanton}, ${selectedProvince} miniatura`} />
                    <ul className='flex flex-col gap-1'>
                      <li className='flex gap-1 items-center'><HorizontalLine size={18} /> 84 memorias</li>
                      <li className='flex gap-1 items-center'><HorizontalLine size={18} /> Desde 1932</li>
                      <li className='flex gap-1 items-center'><HorizontalLine size={18} /> 8 cantones</li>
                    </ul>
                  </div>
                </div>


              </div>
              <PrimaryButton>
                Explorar museo digital <Arrow size={22} />
              </PrimaryButton>
            </div>
            <div className='flex-1 max-w-125 max-h-125 overflow-hidden flex justify-center items-center' onClick={clickOutSide}>
              <Map updateSelected={updateSelectedProvince} selectedProvince={selectedProvince} />
            </div>
          </div>
          <div className='h-20 w-128 bg-amber-200 mx-auto mt-24'>Esto será publicidad</div>
        </div>
      </div>
    </>
  )
}

export default App
