const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (ApiResponse.status === 200) {

        const data =  await ApiResponse.json();
        return data;

    }


}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = "block";
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonNumber.innerHTML = "0";
        pokemonName.innerHTML = "Not found";
        pokemonImage.style.display = "none";
    }
}

form.addEventListener("submit", (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon("1")
