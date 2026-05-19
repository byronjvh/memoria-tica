import { useEffect, useState } from 'react'
import './App.css'
import Map from './components/Map'
import { Arrow, HorizontalLine } from './components/Icons'
import CustomSelect from './components/CustomSelect'
import { paths as provinces } from "./MapPathArray"
import cantons from "./data/cantones.json"
import PrimaryButton from './components/PrimaryButton'
import Header from './components/Header'
import BackgroundOverlay from './components/BackgroundOverlay'
import { supabase } from './lib/supabase'

function App() {
  const [selectedProvince, setSelectedProvince] = useState(0)
  const [selectedCanton, setSelectedCanton] = useState(0)
  const provinceList = provinces.map(el => ({ name: el.name, id: el.id }))
  const cantonList = Object.entries(cantons).map(el => ({ id: el[0], name: el[1].Nombre, province: el[1].Provincia, population: el[1]['Pop. (2008)'], area: el[1]['Área (km2)'] }))
  const filteredCantons = cantonList.filter(el => Number(el.province) === Number(selectedProvince))
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      const result = await supabase.auth.getSession();

      if (result.data?.session && result.data?.session.user) {
        setSession(result.data.session);
        setUser(result.data.session.user);
      }

      setLoading(false);
    }

    loadSession();
  }, []);

  async function handleSignIn() {
    const email = prompt("Correo");
    const password = prompt("Contraseña");

    if (!email || !password) return;

    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const sessionResult = await supabase.auth.getSession();

    setSession(sessionResult.data.session);
    setUser(sessionResult.data.session.user);
  }

  async function handleSignUp() {
    const email = prompt("Correo");
    const password = prompt("Contraseña");

    if (!email || !password) return;

    const result = await supabase.auth.signUp({
      name: email.split("@")[0] || "User",
      email,
      password,
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const sessionResult = await supabase.auth.getSession();

    setSession(sessionResult.data.session);
    setUser(sessionResult.data.session.user);
  }

  async function handleSignOut() {
    await supabase.signOut();

    setSession(null);
    setUser(null);
  }

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
      <div className='h-[85svh]'>

        <Header />
        <div className='hero px-2'>
          <div className='flex max-w-250 mx-auto justify-between'>
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
                  border-border-main bg-text-light/40 backdrop-blur-xl
                  border-2
                  transition-all duration-500 ease-out gap-2
                  province-preview
                  
                  `
              }>
                <div className={`${selectedProvince ? "hidden" : "flex"} gap-2`}>
                  <div className="h-1.5 w-24 rounded-full bg-text-light/90" />
                  <div className="h-1.5 w-12 rounded-full bg-text-light/60" />
                </div>

                <div className=''>
                  <div className='mb-4 border-b-2 border-text-muted/30'>
                    <h3 className='text-text-muted text-sm pb-2 uppercase tracking-wide'>Archivo histórico</h3>
                  </div>
                  <div className='flex items-center gap-3'>
                    <img className='aspect-video object-cover w-50 overflow-hidden rounded-lg' src="https://cdn.viralagenda.com/images/events/c2f9af0c265a95474071537154fac1d2-large.jpg" alt={`${selectedCanton}, ${selectedProvince} miniatura`} />
                    <ul className='flex flex-col gap-1 text-text-dark'>
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
            <div className='flex-1 max-w-125 max-h-125 overflow-hidden flex justify-center items-center relative' onClick={clickOutSide}>
              <Map updateSelected={updateSelectedProvince} selectedProvince={selectedProvince} />
              <div className="map-radar-effect">
                <div className="radar-base" />
                <div className="radar-inner-ring" />
                <div className="radar-pulse" />
              </div>

            </div>
          </div>
          <div className='max-w-240 min-h-22.5 sm:w-[calc(100% - 32px)] mx-auto mt-16 bg-amber-50'>
            publicidad
          </div>
        </div>
      </div>
      <div className='w-full max-w-250 mx-auto flex flex-col gap-1'>
        <h3 className='uppercase tracking-wide text-text-dark'>Memorias Destacadas</h3>
        <div className='border-2 border-text-light h-32 rounded-xl bg-text-light-soft/50'>

        </div>
      </div>
    </>
  )
}

export default App
