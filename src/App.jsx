import './App.css';
import { useEffect, useState } from 'react';
import API from 'service/API';


import pokeball from './img/pokeball.png';
import center from './img/center.jpg';
import pikachu from './img/pokemon64.png';
import bulbasaur from './img/bulbasaur.png';
import { AiOutlineCompress } from "react-icons/ai";
import { Decor } from 'components/Decor/Decor';
import { LeftHeader } from 'components/LeftHeader/LeftHeader';
import { MainDisplay } from 'components/MainDisplay/MainDisplay';
import { Evolution } from 'components/Evolution/Evolution';



function App() {  
  const [queryPokemon,setQueryPokemon]=useState('')
  const [pokemon,setPokemon]=useState(null)

  const [descriptions,setDescriptions]=useState([])
  const[indxDescriptions,setIndxDescriptions]=useState(0)

  const [evolPokemons,setEvolPokemons]=useState([])

  const [types,setTypes]=useState([])

  const [selectedType,setSelectedType]=useState(null)
  const [pokemonsOfType,setPokemonsOfType]=useState([])
  const [offsetType,setOffsetType]=useState(0)

  const[error,setError]=useState(false)

  useEffect(() =>{
    if(!queryPokemon)return;

    API.getPokemon(queryPokemon,error,setPokemon,setEvolPokemons,setDescriptions,setError)

  },[error, queryPokemon])


  useEffect(()=>{
  if(!selectedType)return

  API.getTypePokemons(selectedType,setPokemonsOfType)

  },[selectedType])


  useEffect(()=>{

    API.getALLTypes(setTypes)

  },[])


function handleSubmit(e){
    setQueryPokemon(e.target.hero.value.trim().toLowerCase())
  }

function handleKillPokemon(){
  setQueryPokemon('')
  setPokemon(null)
  setDescriptions([])
  setEvolPokemons([])
  setError(false)
}

function handlChangeType(e){
  const activeType =e.target.value.toLowerCase()
  setSelectedType(types.find(({name})=>name===activeType))
  setOffsetType(0)
}

function handlePrevType(){
  setOffsetType(offsetType - 12 > 0 ? offsetType-12:0)
}
function handleNextType(){
  setOffsetType(pokemonsOfType.length>offsetType+12?offsetType+12:pokemonsOfType.length-12)
}

function handleKillTypePokemon(){
  setOffsetType(0)
  setPokemonsOfType([])
  setSelectedType(null)
}

function handleDescription(action){
  const descCount=descriptions.length
  switch(action){
  case 'next':
    setIndxDescriptions(prev => (prev === descCount - 1) ? 0 : prev + 1);
    break;
  case 'prev':
    setIndxDescriptions(prev => (prev === 0) ? descCount - 1 : prev - 1);
    break;
    default:
      return;
}
}

  return (
    <div className="App">
      <header></header>
        <main className="App-main">
          <div className="pokedex">
            <div className='left_page'>

              <LeftHeader pokemon={pokemon}/>

              <MainDisplay 
              pokemon={pokemon} 
              error={error} 
              handleKillPokemon={handleKillPokemon} 
              handleSubmit={handleSubmit}/>
              
              <Evolution evolPokemons={evolPokemons} setQueryPokemon={setQueryPokemon}/>

            </div>

            <div><img src={center} alt='center' height='668px'/></div>

            <div className='right_page'>

            <div  className="pokedex_headar_right">
              <div className='field_pokeball'>
              <span className='title_pokedex'>Pokedex</span>
              <div className='pikachu_ball_wrap'>
                <img src={pikachu}  alt='pikachu' height='30px' width='30px'/>
                  <div className='wrap_pokeball '>
                    <img src={pokeball} alt='pokeball' height='30px' width='30px'/>
                    </div>
                  <img src={bulbasaur}  alt='bulbasaur' height='30px' width='30px'/>
              </div>
              </div>
            </div>
              
              <div className='monitor_right flex'>
                <ul className='list_pok flex'>
                {pokemonsOfType.slice(offsetType, offsetType+12).map(({pokemon:{name}})=><li key={name}  className='item_pok'>
                    <span type='button' className='pokemon_of_type' onClick={()=>setQueryPokemon(name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    </li>
                )}
                </ul>
              </div>
              
              <ul className='list_type flex'>
              {types.map(({name,url})=><li key={name}  className='item_type'><input type='button' onClick={handlChangeType} value={name.charAt(0).toUpperCase() + name.slice(1)} className={`btn_type ${selectedType && selectedType.name === name && name}`} /></li>)}
              </ul>
              <div className='wrap_type_btn'>
              <div className='container_kil_type flex'>
                <button className='btn_kill_pokemon flex' type='button' onClick={handleKillTypePokemon}><AiOutlineCompress style={{color:'#2f3638'}} size='30px'/></button>
                </div>
                <div className='container_btn_page'>
                  <button type='button' className='btn_prev' onClick={handlePrevType}>Prev</button>
                  <button type='button' className='btn_next' onClick={handleNextType}>Next</button>
                </div>
              </div>
              <div className='monitor_right flex'>
                <p>{descriptions[indxDescriptions]}</p>
              </div>
              <div className='desc_wrap flex'>
                <div className='desc_center_wrap flex'>
                  <button type='button' className='togle_desc_btn flex' onClick={()=>handleDescription('next')}>
                    <AiOutlineCompress style={{color:'whitesmoke'}} size='30px'/></button>
                  <button type='button' className='togle_desc_btn flex' onClick={()=>handleDescription('prev')}>
                    <AiOutlineCompress style={{color:'whitesmoke'}} size='30px'/></button>
                </div>
              </div>
              <Decor/>
            </div>
          </div>
        </main>
      
    </div>
  );

}

export default App;