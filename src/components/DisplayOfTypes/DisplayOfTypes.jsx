import { useState,useEffect } from "react";
import API from "service/API";
import './DisplayOfTypes.css';
import { AiOutlineCompress } from "react-icons/ai";
import { refactorName } from "util/refactorName";

export const DisplayOfTypes = ({setQueryPokemon}) => {
    const [types,setTypes]=useState([])

    const [selectedType,setSelectedType]=useState(null)
    const [pokemonsOfType,setPokemonsOfType]=useState([])
    const [offsetType,setOffsetType]=useState(0)

    useEffect(()=>{

        API.getALLTypes(setTypes)

    },[])

    useEffect(()=>{
        if(!selectedType)return
    
        API.getTypePokemons(selectedType,setPokemonsOfType)
    
    },[selectedType])

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

    return(
        <>
        <div className='monitor_right flex'>
            <ul className='list_pok flex'>
                {pokemonsOfType.slice(offsetType, offsetType+12).map(({pokemon:{name}})=>
                <li key={name}  className='item_pok'>
                    <span type='button' className='pokemon_of_type' onClick={()=>setQueryPokemon(name)}>
                    {refactorName(name)}</span>
                </li>
                )}
            </ul>
        </div>

        <ul className='list_type flex'>
            {types.map(({name})=><li key={name} className='item_type'>
                <input type='button' onClick={handlChangeType} value={refactorName(name)} 
                className={`btn_type ${selectedType && selectedType.name === name && name}`} />
                </li>)}
        </ul>

        <div className='wrap_type_btn'>
            <div className='container_kil_type flex'>
                <button className='btn_kill_pokemon flex' type='button' onClick={handleKillTypePokemon}>
                    <AiOutlineCompress style={{color:'var(--primary-bgcolor)'}} size='30px'/></button>
            </div>
            <div className='container_btn_page'>
                <button type='button' className='btn_prev' onClick={handlePrevType}>Prev</button>
                <button type='button' className='btn_next' onClick={handleNextType}>Next</button>
            </div>
        </div>
        </>
    )
}