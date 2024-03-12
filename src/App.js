import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import screen from './img/1.png'
import defaultPokemon from './img/default.jpg';

function App() {
  const [query,setQuery]=useState('')
  const [queryPokemon,setQueryPokemon]=useState('')
  const [pokemon,setPokemon]=useState(null)

  useEffect(() =>{
    if(!queryPokemon)return;
    async function getPokemn(){
    const {data} =await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryPokemon}`)
    setPokemon(data)
    console.log(data)
    }
    getPokemn();
  },[queryPokemon])

function handleSubmit(e){
    e.preventDefault()
    setQueryPokemon(e.target.hero.value.trim().toLowerCase())
  }

function handleKillPokemon(){
  setQueryPokemon('')
  setPokemon(null)
}  

  return (
    <div className="App">
      <header></header>
        <main className="App-main">
          <div className="pokedex">

          <div  className="pokedex_headar">
              <div className="pokedex_headar_sensor flex" style={{backgroundColor:pokemon?'aliceblue':'#2f3638'}}>
                {pokemon && <img  src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.other.home.front_default} alt={pokemon.name} width='30px'/>}
                </div>
                <div className='pokedex_headar_sensor_mid'></div>
                <div className='pokedex_headar_sensor_easy'></div>
            </div>


            

            <div className='left_page'>

            <div className='panel'>
              <div className='lights_container flex'><div className='light'></div><div className='light'></div></div>
            {pokemon && <div className='tv_container'>
                
                <div className='wraper_tv'>
                <div>
                  <p className='name_pokemon'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    <div className='wraper_image_pokemon' >
                    <img src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default || defaultPokemon} alt={pokemon.name} width='200px' height='254px'/>
                    </div>
                </div>
                  <div>
                    <p className='stats_title'>Stats:</p>
                    <ul className='list_stats'>
                    {pokemon.stats.map((el,indx)=><li className='item_stats' key={indx}>
                      <span>{el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)}</span>
                      <span className='stats_radius' 
                      style={{backgroundImage:`linear-gradient(to right,${(+el.base_stat>=100 ? '#09792b 100%,#09792b' : `#09792b ${el.base_stat}%,black ${el.base_stat}%`)}`}}>{el.base_stat}</span>
                      </li>)}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className='gabarit'>
                    <span className='item_stats'>Weight: {pokemon.weight / 10}kg</span>
                    <span className='item_stats'>Height: {pokemon.height / 10}m</span>
                  </div>
                  <div className='container_types'>Types:
                    {pokemon.types.map(({type:{name}})=><span key={name} className={`type ${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>)}
                  </div>
                </div>
                </div>}
                {!pokemon && <img src={screen} width='313px' height='326px' alt='screen'/>}
                <div className='wraper_kill_pokemon'>
                  <ul className='dynamic'><li className='dynamic_item'></li><li className='dynamic_item'></li><li className='dynamic_item'></li><li className='dynamic_item'></li></ul>
                  <button className='btn_kill_pokemon' type='button' onClick={handleKillPokemon}></button>
                </div>
                </div>
                

              <form onSubmit={handleSubmit}>
                <label>
                  <input name='hero' value={query} onChange={(e)=>setQuery(e.target.value)}></input>
                  <button type='submit'>Пошук</button>
                </label>
              </form>
              
            </div>
            <div style={{width:'50%',backgroundColor:'green'}}><h1>AAAAAAAAAAAAAAAAAAA</h1></div>
          </div>
        </main>
      
    </div>
  );
}

export default App;
// pokemon.sprites.other.showdown.front_default
// pokemon.sprites.other.dream_world.front_default
// pokemon.sprites.other['official-artwork'].front_default