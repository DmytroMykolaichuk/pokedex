import './Evolution.css';
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsBrowserEdge } from "react-icons/bs";
import pokeball from '../../img/pokeball.png';


export function Evolution({evolPokemons,setQueryPokemon}){

    return(
        <div className='container_evolutions'>
            
            <span className='evolutions'>Evolutions</span>
            
            <div className='evolutions_panel flex'>


                {!evolPokemons.length && [1,2,3].map((emptyPokeball,indx)=>
                <div className='evo_item flex' key={emptyPokeball}>
                    <div className='wraper_evol_pok flex'>
                        <img src={pokeball} alt='pokeball'width='120px' height='120px'/>
                    </div>
                    {indx < [1,2,3].length - 1 && <TbPlayerTrackNextFilled size='40px' style={{ color: 'var(--primary-color)' }}/>}
                </div>)}


                {evolPokemons.length && evolPokemons.length <= 4 &&
                evolPokemons.map((evolution,indx)=>
                <div className='evo_item flex' key={evolution.name} onClick={()=>setQueryPokemon(evolution.name)}>
                    <div className='wraper_evol_pok flex' 
                    style={{width:evolPokemons.length===4?'96px':'120',height:evolPokemons.length===4?'96px':'120'}}>
                        <img src={evolution.sprites.other.dream_world.front_default || 
                        evolution.sprites.other['official-artwork'].front_default || 
                        pokeball} alt={evolution.name} width={evolPokemons.length===4?'90px':'100px'} height={evolPokemons.length===4?'90px':'100px'}/>
                    </div>
                    {indx < evolPokemons.length - 1 &&  <TbPlayerTrackNextFilled size={evolPokemons.length===4?'20px':'40px'} style={{ color: 'var(--primary-color)' }}/>}
                </div>)}


                {evolPokemons.length > 4 &&
                <div className='many_evol'>
                
                    <div className='first_of_many_evol flex' onClick={()=>setQueryPokemon(evolPokemons[0].name)}>
                        <div className='wraper_evol_pok flex'>
                            <img src={evolPokemons[0].sprites.other.dream_world.front_default || 
                            evolPokemons[0].sprites.other['official-artwork'].front_default || 
                            pokeball} alt={evolPokemons[0].name} width='100px' height='100px'/>
                        </div>
                    {<TbPlayerTrackNextFilled size='30px' style={{ color: 'var(--primary-color)' }}/>}
                    </div>

                    <div className='all_of_many_evol'>
                    {evolPokemons.slice(1).map((evolution,indx)=>
                    <div className='many_evo_item' key={evolution.name} onClick={()=>setQueryPokemon(evolution.name)}>
                        <div className='many_wraper_evol_pok flex'>
                            <img src={evolution.sprites.other.dream_world.front_default || 
                            evolution.sprites.other['official-artwork'].front_default || 
                            pokeball} alt={evolution.name} width='50px' height='50px'/>
                        </div>
                        {(indx + 1) % 4 !== 0 && indx !== evolPokemons.length - 2 && (evolPokemons[0].name==='eevee'?
                        <BsBrowserEdge size='20px' style={{ color: 'var(--primary-color)' }}/>:
                        <TbPlayerTrackNextFilled size='20px' style={{ color: 'var(--primary-color)' }}/>)
                        }
                    </div>)}

                    </div>
                </div>}   

            </div>
        </div>
    )
}