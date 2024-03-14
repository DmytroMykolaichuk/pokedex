import pokeball from '../../img/pokeball.png';
import './LeftHeader.css';

export function LeftHeader({pokemon}){
    return(
    <div  className="pokedex_headar">
        <div className="pokedex_headar_sensor flex" style={{backgroundColor:pokemon?'aliceblue':'#2f3638'}}>
            {pokemon && 
            <img  width='30px' alt={pokemon.name}
            src={pokemon.sprites.other.showdown.front_default || pokemon.sprites.other.home.front_default || pokeball} />}
        </div>
        <div className='pokedex_headar_sensor_mid'></div>
        <div className='pokedex_headar_sensor_easy'></div>
    </div>
    )
}