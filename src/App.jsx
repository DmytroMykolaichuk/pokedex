import { useEffect, useState } from 'react';
import API from 'service/API';
import center from './img/center.jpg';
import { Decor } from 'components/Decor/Decor';
import { LeftHeader } from 'components/LeftHeader/LeftHeader';
import { MainDisplay } from 'components/MainDisplay/MainDisplay';
import { Evolution } from 'components/Evolution/Evolution';
import { RightHeader } from 'components/RightHeader/RightHeader';
import { DisplayOfTypes } from 'components/DisplayOfTypes/DisplayOfTypes';
import { Descriptions } from 'components/Descriptions/Descriptions';
import './App.css';

function App() {  

  const [queryPokemon,setQueryPokemon]=useState('')
  const [pokemon,setPokemon]=useState(null)

  const [descriptions,setDescriptions]=useState([])

  const [evolPokemons,setEvolPokemons]=useState([])

  const[error,setError]=useState(false)

  useEffect(() =>{
    if(!queryPokemon)return;

    API.getPokemon(queryPokemon,error,setPokemon,setEvolPokemons,setDescriptions,setError)

  },[error, queryPokemon])

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

              <RightHeader/>

              <DisplayOfTypes setQueryPokemon={setQueryPokemon}/>

              <Descriptions descriptions={descriptions}/>

              <Decor/>
            </div>
          </div>
        </main>
      
    </div>
  );

}

export default App;