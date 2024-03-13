import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import screen from '../img/1.png'
import defaultPokemon from '../img/default.jpg';
import pokeball from '../img/pokeball.png';
import center from '../img/center.jpg';
import pikachu from '../img/pokemon64.png';
import bulbasaur from '../img/bulbasaur.png';
import { AiOutlineCompress } from "react-icons/ai";
import { GrFingerPrint } from "react-icons/gr";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

function App() {
  const [query,setQuery]=useState('')
  const [queryPokemon,setQueryPokemon]=useState('')
  const [pokemon,setPokemon]=useState(null)

  const [descriptions,setDescriptions]=useState([])
  const[indxDescriptions,setIndxDescriptions]=useState(0)

  const [evolutionQuery,setEvolutionQuery]=useState('')
  const [evolution,setEvolution]=useState([])
  const [evolPokemon,setEvolPokemon]=useState([])

  const [types,setTypes]=useState([])
  const [queryType,setQueryType]=useState(null)
  const [pokemonsOfType,setPokemonsOfType]=useState([])
  const [offsetType,setOffsetType]=useState(0)

  const[error,setError]=useState(false)

  useEffect(()=>{
    if(!queryPokemon)return
    async function getPokemonsDiscription(){
      try {
        const {data:{flavor_text_entries}}=await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${queryPokemon}`)
      const description=flavor_text_entries.reduce((acc,desc)=>{
        if(desc.language.name==='en' && !acc.includes(desc.flavor_text)){
          acc.push(desc.flavor_text)
        }
        return acc;
      },[])
      setDescriptions(description)
      } catch (error) {
        setDescriptions(['There is no information about this Pokemon'])
        console.log('description')
      }
    }
    getPokemonsDiscription()
  },[queryPokemon])

useEffect(()=>{
  if(!queryType)return
  async function getTypePokemon(){
    try {
      const {data:{pokemon}} = await axios.get(queryType.url)
    setPokemonsOfType(pokemon)
    } catch (error) {
      setError(true)
      console.log('arr evol')
    }
  }
  getTypePokemon()
},[queryType])

  useEffect(()=>{
    async function getTypes() {
      try {
        const {data:{results}}= await axios.get('https://pokeapi.co/api/v2/type/')
        setTypes(results)
      } catch (error) {
        setError(true)
        console.log('start types')
      }
    }
    getTypes()
  },[])

  useEffect(() => {
    if (evolution.length === 0) return;
    async function getEvolutionPokemon() {
      try {
        const allEvolPromises = evolution.map(async (pok) => {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pok}`);
          return data;
        });
        const allEvol = await Promise.all(allEvolPromises);
        setEvolPokemon(allEvol);
      } catch (error) {
        setError(true)
        setEvolPokemon([])
        setPokemon(null)
        setDescriptions([])
        console.log('obj pokemons for evol')
      }
    }
    getEvolutionPokemon();
  }, [evolution]);

  useEffect(() =>{
    if(!queryPokemon)return;
    async function getPokemn(){
      try {
        const {data} =await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryPokemon}`)
        setPokemon(data)
        const speciesNew =await axios.get(data.species.url)
        setEvolutionQuery(speciesNew.data.evolution_chain.url)
        if(error)setError(false)
        if(!offsetType)setOffsetType(0)
      } catch (error) {
        setPokemon(null)
        setEvolutionQuery('')
        setQuery('')
        setError(true)
        setEvolPokemon([])
        setDescriptions([])
        console.log('obj pokemon')
      }
      }
    getPokemn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryPokemon])

  useEffect(()=>{
    if(!evolutionQuery)return;
    async function getEvolution(){
      try {
        const {data:{chain}} = await axios.get(evolutionQuery)
        if(chain.evolves_to.length <= 1){
          const evol=[]
          evol.push(chain.species.name)
          chain?.evolves_to[0]?.species?.name && evol.push(chain.evolves_to[0].species.name)
          chain?.evolves_to[0]?.evolves_to[0]?.species?.name && evol.push(chain.evolves_to[0].evolves_to[0].species.name)
          setEvolution(evol)
        }else{
          const zeroEvol=chain.species.name
          const newEvol = chain.evolves_to.map(el=>el.species.name)
          setEvolution([zeroEvol,newEvol[0],newEvol[1]])
        }
      } catch (error) {
        setEvolPokemon([])
        setError(true)
        console.log('evolution arr')
      }
  }
  getEvolution()
  },[evolutionQuery])

function handleSubmit(e){
    e.preventDefault()
    setQueryPokemon(e.target.hero.value.trim().toLowerCase())
  }

function handleKillPokemon(){
  setQueryPokemon('')
  setEvolutionQuery('')
  setPokemon(null)
  setDescriptions([])
  setEvolPokemon([])
  setError(false)
}  
function handlChangeType(e){
  const activeType =e.target.value.toLowerCase()
  setQueryType(types.find(({name})=>name===activeType))
  setOffsetType(0)
}
function handlePrevType(){
  setOffsetType(offsetType - 12 > 0 ? offsetType-12:0)
}
function handleNextType(){
  setOffsetType(pokemonsOfType.length>offsetType+12?offsetType+12:pokemonsOfType.length-12)
}
function handlePokemonOfType(name){
  setQueryPokemon(name)
}
function handleKillTypePokemon(){
  setOffsetType(0)
  setPokemonsOfType([])
  setQueryType(null)
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

          <div  className="pokedex_headar">
              <div className="pokedex_headar_sensor flex" style={{backgroundColor:pokemon?'aliceblue':'#2f3638'}}>
                {pokemon && <img  src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.other.home.front_default || pokeball} alt={pokemon.name} width='30px'/>}
                </div>
                
                <div className='pokedex_headar_sensor_mid'></div>
                <div className='pokedex_headar_sensor_easy'></div>
            </div>


            

            <div className='left_page'>
            
            <div className='flex'><div className='unknown_pokemon'>
              {error && 'Unknown Pokemon'}
              {pokemon && pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div></div >


            <div className='panel'>
              <div className='lights_container flex'><div className='light'></div><div className='light'></div></div>
              {error && <div className='wraper_screen'><img src={defaultPokemon} width='437px' height='286px' alt='screen'/></div>}
            {pokemon && !error && <div className='tv_container'>
                
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
                      style={{backgroundImage:`linear-gradient(to right,${(+el.base_stat>=100 ? '#68ae28 100%,#68ae28' : `#68ae28 ${el.base_stat}%,#2f3638 ${el.base_stat}%`)}`}}>{el.base_stat}</span>
                      </li>)}
                    </ul>
                  </div>
                  <div className='gabarit_types_wrap'>
                  <div className='gabarit'>
                    <span className='item_stats'>Weight: {pokemon.weight / 10}kg</span>
                    <span className='item_stats'>Height: {pokemon.height / 10}m</span>
                  </div>
                  <div className='container_types'>Types:
                    {pokemon.types.map(({type:{name}})=><span key={name} className={`type ${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>)}
                  </div>
                </div>
                </div>
                
                </div>}
                {!pokemon && !error && <div className='wraper_screen'><img src={screen} width='437px' height='286px' alt='screen'/></div>}
                <div className='wraper_kill_pokemon'>
                  <ul className='dynamic'><li className='dynamic_item'></li><li className='dynamic_item'></li><li className='dynamic_item'></li><li className='dynamic_item'></li></ul>
                  <button className='btn_kill_pokemon flex' type='button' onClick={handleKillPokemon}><AiOutlineCompress style={{color:'#2f3638'}} size='30px'/></button>
                </div>
                </div>
                

              <form className='search_form' onSubmit={handleSubmit}>
                <label className='search_label'>
                  <input className='search_input' name='hero' value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='enter name pokemon or number to 1025' ></input>
                </label>
                <button className='search_btn' type='submit'><GrFingerPrint size='30px'/></button>
              </form>
              
              <div className='container_evolutions'>
                <span className='evolutions'>Evolutions</span>
                <div className='evolutions_panel'>
                  <div>
                    <div className='container_pok_evol flex'>
                    {
                    evolPokemon.length>0?
                    evolPokemon.map((evolution,indx)=><div className='evo_item flex' key={evolution.name} onClick={()=>setQueryPokemon(evolution.name)}>
                      <div className='wraper_evol_pok flex'>
                        <img src={evolution.sprites.other.dream_world.front_default || evolution.sprites.other['official-artwork'].front_default || defaultPokemon} alt={evolution.name} width='100px' height='100px'/>
                        </div>
                        {indx < evolPokemon.length - 1 && 
                        <div style={{ color: '#e53b3b' }}>
                        <TbPlayerTrackNextFilled size='40px' />
                      </div>}
                      </div>)
                      :[1,2,3].map((evolution,indx)=><div  className='evo_item flex' key={evolution}>
                      <div className='wraper_evol_pok flex'>
                        <img src={pokeball} alt='pokeball'width='120px' height='120px'/>
                      </div>
                      {indx < [1,2,3].length - 1 && 
                      <div style={{ color: '#e53b3b' }}>
                        <TbPlayerTrackNextFilled size='40px' />
                      </div>}
                      </div>)
                      }
                    </div>
                  </div>
                </div>
              </div>

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
                    <span type='button' className='pokemon_of_type' onClick={()=>handlePokemonOfType(name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    </li>
                )}
                </ul>
              </div>
              
              <ul className='list_type flex'>
              {types.map(({name,url})=><li key={name}  className='item_type'><input type='button' onClick={handlChangeType} value={name.charAt(0).toUpperCase() + name.slice(1)} className={`btn_type ${queryType && queryType.name === name && name}`} /></li>)}
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
              <ul className='list_decor first_decor_list'>
              <li className='item_decor' style={{width:'5%'}}></li>
              <li className='item_decor' style={{width:'10%'}}></li>
              <li className='item_decor' style={{width:'15%'}}></li>
              <li className='item_decor' style={{width:'20%'}}></li>
              <li className='item_decor' style={{width:'25%'}}></li>
              <li className='item_decor' style={{width:'30%'}}></li>
              <li className='item_decor' style={{width:'100%'}}></li>
              </ul>
              <ul className='list_decor second_decor_list'>
              <li className='item_decor' style={{width:'5%'}}></li>
              <li className='item_decor' style={{width:'10%'}}></li>
              <li className='item_decor' style={{width:'15%'}}></li>
              <li className='item_decor' style={{width:'20%'}}></li>
              <li className='item_decor' style={{width:'25%'}}></li>
              <li className='item_decor' style={{width:'30%'}}></li>
              <li className='item_decor' style={{width:'100%'}}></li>
              </ul>
            </div>
          </div>
        </main>
      
    </div>
  );

}

export default App;
// pokemon.sprites.other.showdown.front_default
// pokemon.sprites.other.dream_world.front_default
// pokemon.sprites.other['official-artwork'].front_default