import axios from 'axios';

async function getPokemon(queryPokemon,evolutionQuery,setPokemon,setEvolutionQuery,setEvolPokemons,setDescriptions,setError,setIsLoading){

  try {
    const {data} =await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryPokemon}`)
    setPokemon(data)

    const speciesNew =await axios.get(data.species.url)
    const newEvolutionQuery = speciesNew.data.evolution_chain.url
    if(evolutionQuery !== newEvolutionQuery){
      setIsLoading(true)
      setEvolutionQuery(newEvolutionQuery)
      getEvolutionList(newEvolutionQuery,setEvolPokemons,setIsLoading)
    }

    getPokemonDescriptions(queryPokemon,setDescriptions)

    setError(false)

  } catch (error) {
    setPokemon(null)
    setError(true)
    setEvolPokemons([])
    setEvolutionQuery('')
    setDescriptions([])
    console.log('primary obj pokemon')
  }
  }

  async function getEvolutionList(newEvolutionQuery,setEvolPokemons,setIsLoading){
    try {
      const {data:{chain}} = await axios.get(newEvolutionQuery)
      const evol=[]

      if(!chain.evolves_to.length){
        evol.push(chain.species.name)
      }else if(chain.evolves_to.length === 1){
        evol.push(chain.species.name)
        chain?.evolves_to[0]?.species?.name && evol.push(chain.evolves_to[0].species.name)
        chain?.evolves_to[0]?.evolves_to[0]?.species?.name && evol.push(chain.evolves_to[0].evolves_to[0].species.name)
      }else{
        evol.push(chain.species.name)
        chain.evolves_to.forEach(el=>evol.push(el.species.name))
      }
      getEvolutionPokemons(evol,setEvolPokemons,setIsLoading)
    } catch (error) {
      setIsLoading(false)
      console.log('evolution name arr')
    }
}

  async function getEvolutionPokemons(evolution,setEvolPokemons,setIsLoading) {
  try {
    const allEvolPromises = evolution.map(async (pok) => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pok}`);
      return data;
    });
    const allEvol = await Promise.all(allEvolPromises);
    setEvolPokemons(allEvol);
    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
    setEvolPokemons([])
    console.log('objets for evolution pokemon')
  }
}

  async function getPokemonDescriptions(queryPokemon,setDescriptions){
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

  async function getTypePokemons(queryType,setPokemonsOfType){
    try {
      const {data:{pokemon}} = await axios.get(queryType.url)
    setPokemonsOfType(pokemon)
    } catch (error) {
      console.log('selected type of pokemons')
    }
  }

  async function getALLTypes(setTypes) {
    try {
      const {data:{results}}= await axios.get('https://pokeapi.co/api/v2/type/')
      setTypes(results)
    } catch (error) {
      console.log('start types')
    }
  }


  const API={
    getPokemon,
    getALLTypes,
    getTypePokemons,
  };

  export default API;