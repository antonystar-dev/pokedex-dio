//1 inicio
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords=150;
const limit = 15;
let offset = 0;

function convertPokemonToLi(pokemon){

        
    return`
    

       <li class="pokemon ${pokemon.type}">
            <span class="number">#${idpok=pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                   ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <a href="detalhes.html?page=${teste1=pokemon.number-1}"><img src="${pokemon.photo}"alt="${pokemon.name}"></a>
            </div>
        </li>
    
    `
   
           //aq é a case e não aspas simples
        
}
function loadPokemonItens(offset,limit){
pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
})    
}
 loadPokemonItens(offset,limit)



loadMoreButton.addEventListener('click', ()=>{
    offset += limit
    const qtdRecordNexpage = offset+limit
    if(qtdRecordNexpage>= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
    

})
details.addEventListener('click',()=>{
    window.location='detalhes.html'
})