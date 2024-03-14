import './MainDisplay.css';
import { useState } from 'react';
import { refactorName } from 'util/refactorName';
import { GrFingerPrint } from "react-icons/gr";
import { AiOutlineCompress } from "react-icons/ai";
import unknownPokemon from '../../img/default.jpg';
import screen from '../../img/1.png'


export function MainDisplay({pokemon,error,handleKillPokemon,handleSubmit}){
    const [query,setQuery]=useState('')
    
    function onSubmit(e){
    e.preventDefault()
    setQuery('')
    handleSubmit(e)
    }

    return(
        <>
        <div className='flex'>
                <div className='unknown_pokemon'>
                {error && 'Unknown Pokemon'}
                {pokemon && refactorName(pokemon.name)}
            </div>
        </div >
            
        <div className='panel'>

            <div className='lights_container flex'>
                <div className='light'></div>
                <div className='light'></div>
            </div>

            {error && <div className='wraper_screen'>
                <img src={unknownPokemon} width='437px' height='286px' alt='screen'/>
            </div>}

            {pokemon && !error && <div className='tv_container'>
                <div className='wraper_tv'>
                    <div>
                        <p className='name_pokemon'>{refactorName(pokemon.name)}</p>
                        <div className='wraper_image_pokemon' >
                        <img alt={pokemon.name} width='200px' height='254px'
                        src={pokemon.sprites.other.dream_world.front_default || 
                        pokemon.sprites.other['official-artwork'].front_default || 
                        unknownPokemon} />
                    </div>
                </div>

                <div>
                    <p className='stats_title'>Stats:</p>
                    <ul className='list_stats'>
                        {pokemon.stats.map((el,indx)=><li className='item_stats' key={indx}>
                        <span>{refactorName(el.stat.name)}</span>
                        <span className='stats_radius' 
                        style={{backgroundImage:`linear-gradient(to right,${(+el.base_stat>=100 ? 
                        '#68ae28 100%,#68ae28' : 
                        `#68ae28 ${el.base_stat}%,var(--primary-bgcolor) ${el.base_stat}%`)}`}}>
                            {el.base_stat}</span>
                        </li>)}
                    </ul>
                </div>

                <div className='gabarit_types_wrap'>
                    <div className='gabarit'>
                        <span className='item_stats'>Weight: {pokemon.weight / 10}kg</span>
                        <span className='item_stats'>Height: {pokemon.height / 10}m</span>
                    </div>
                    <div className='container_types'>Types:
                        {pokemon.types.map(({type:{name}})=><span key={name} className={`type ${name}`}>
                        {refactorName(name)}</span>)}
                    </div>
                </div>
            </div>

            </div>}

            {!pokemon && !error && <div className='wraper_screen'>
                <img src={screen} width='437px' height='286px' alt='screen'/>
            </div>}

            <div className='wraper_kill_pokemon'>
                <ul className='dynamic'>
                    <li className='dynamic_item'></li>
                    <li className='dynamic_item'></li>
                    <li className='dynamic_item'></li>
                    <li className='dynamic_item'></li>
                </ul>
                <button className='btn_kill_pokemon flex' type='button' onClick={handleKillPokemon}>
                    <AiOutlineCompress style={{color:'#2f3638'}} size='30px'/>
                </button>
            </div>

        </div>
            
        <form className='search_form' onSubmit={onSubmit}>
            <label className='search_label'>
                <input className='search_input' name='hero' value={query} 
                onChange={(e)=>setQuery(e.target.value)} placeholder='enter name pokemon or number to 1025'></input>
            </label>
            <button className='search_btn' type='submit'><GrFingerPrint size='30px'/></button>
        </form>
        </>
    )
}            