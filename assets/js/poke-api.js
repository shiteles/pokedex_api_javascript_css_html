
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const[type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo =  pokeDetail['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return  fetch(pokemon.url)
            .then((response)=> response.json()) // novo fetch da lista de pokemon e converte em json
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    
    return fetch(url) //busca a lista de pokemon
        .then((response) => response.json()) //converte o response para json
        .then((jsonBody)=> jsonBody.results) //json com todos os detalhes da pagina
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail)) // mapeia para uma lista de requisoções dos deatlhes dos pokemons
        .then((detailRequests)=> Promise.all(detailRequests)) //aguarda todas as requisoções terminarem
        .then((pokemonDetails)=> pokemonDetails)// gera a lista de detalhes dos pokemons
}
