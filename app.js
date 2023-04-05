const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`


    
function generatePokemonPromises(){
  return  Array(150).fill().map((_, index) => 
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))
   
}


function generateHTML(pokemons){
    return pokemons.reduce((accumulator,{name, types, id}) => {
        const elementTypes = types.map((typesInfo) =>  typesInfo.type.name);
        accumulator+= `
          <li class="card ${elementTypes[0]}">
              <img class="card-image"  alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
              <h2 class="card-title">${id} ${name}</h2>
              <p class="card-subtitle">${elementTypes.join(' | ')}</p>
          </li>
        
        `


        return accumulator;

    }, '')

}



function insertPokemonsHTML(pokemons){
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons;
}



const pokemonPromises = generatePokemonPromises();
Promise.all(pokemonPromises)
.then(generateHTML)
.then(insertPokemonsHTML)
  
