import './RightHeader.css';
import pikachu from '../../img/pokemon64.png';
import bulbasaur from '../../img/bulbasaur.png';
import pokeball from '../../img/pokeball.png';

export function RightHeader(){
    return(
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
    )
}