//document.write(idpok)
const urlParams = new URLSearchParams(location.search);
//console.log(urlParams)
//document.write(urlParams.get('page'));

idpok=urlParams.get('page');
class Pokemon{
    number;
    name;
    type;
    types=[];
    photo;
    experience;
    height;
    weight;
    ability=[];
}


const pokeApi = {}



function convertPokeApiDetailtoPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    const types=pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type]=types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo=pokemonDetail.sprites.other.dream_world.front_default
    const abilities = pokemonDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.ability=ability
    pokemon.experience=pokemonDetail.base_experience
    pokemon.height=pokemonDetail.height
    pokemon.weight=pokemonDetail.weight

    return pokemon
}


pokeApi.getDetails =(pokemon)=>{
    return fetch(pokemon.url)
        .then((response)=>response.json())
        .then((pokemonDetail)=>convertPokeApiDetailtoPokemon(pokemonDetail))
       
}

pokeApi.getPokemons=(offset,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response)=>response.json())
        .then((jsonBody)=> jsonBody.results)
        .then((pokemons)=>pokemons.map(pokeApi.getDetails))
        
        .then((detailRequest)=> Promise.all(detailRequest))
     
        .catch((error)=> console.log(error))

}


    const pokemonDetailslist = document.getElementById('pokemonsDetailslist');
    const back = document.getElementById('back');
    
    const limit = 1;
    let offset = idpok;
    
    function loadPokemonDetail(offset,limit){
        pokeApi.getPokemons(offset,limit).then((pokemons =[])=> {
            pokemonDetailslist.innerHTML+=pokemons.map((pokemon)=>
            `
            <div class="pokemonDetails">
                <li class="pokemonListDetails">
                    <span class="number">#${pokemon.number}</span><br>
                    <span class="nomePokemon">${pokemon.name}</span>
                    
                    <div class="typesaAndImg">
                        <ol class="types">
                            ${pokemon.types.map((type)=> `<li class="typePokemon">${type}</li>`).join('')}    
                         
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
            
        
                <div class="characteristicsPokemon">
                    <div class="description">
                        <ul class="descriptionList">
                            
                            <li>Ability:  </li>
                            <li>Experience:  </li>
                            <li>Height:  </li>
                            <li>Weight:  </li>
                            
                        </ul>
                    </div>
                    <div class="description">
                        <ul class="descriptionList">
                            
                            <li>${pokemon.ability}</li>
                            <li>${pokemon.height}</li>
                            <li>${pokemon.weight}</li>
                            <li>${pokemon.experience}</li>
                    
                        </ul>
                    </div>
                </div>
            </div>
        
        `
                
            ).join('');
            
        })
    }
    
    loadPokemonDetail(offset,limit)
    

    
    back.addEventListener('click',()=>{
        window.location='index.html'
    })



 

