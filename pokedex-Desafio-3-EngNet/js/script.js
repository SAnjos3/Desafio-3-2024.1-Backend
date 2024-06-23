const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemonId = 1;

const pokemonNameElement = document.querySelector('.pokemon-name');
const pokemonAbilitiesElement = document.querySelector('.pokemon-abilities');
const pokemonImageElement = document.querySelector('.pokemon-image');
const previousButton = document.getElementById('anterior');
const nextButton = document.getElementById('próximo');
const saibaMaisButton = document.querySelector('.saiba-mais');
const habilidadesContainer = document.getElementById('habilidades-container');
const habilidadesList = document.getElementById('habilidades-list');

async function getPokemonData(pokemonId) {
    try {
        const response = await fetch(`${apiUrl}${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
}

function capData(pokemon) {
    pokemonNameElement.textContent = pokemon.name;
    pokemonAbilitiesElement.textContent = ''; // Limpa o conteúdo anterior das habilidades
    pokemonImageElement.src = pokemon.sprites.front_default;
    saibaMaisButton.addEventListener('click', () => {
        mostrarHabilidades(pokemon.abilities);
    });
}

async function carregarPokemon() {
    const pokemon = await getPokemonData(currentPokemonId);
    capData(pokemon);
}

function proxPokemon() {
    currentPokemonId++;
    if (currentPokemonId > 1025) {
        currentPokemonId = 1;
    }
    habilidadesContainer.classList.remove('visible'); // Esconde o container de habilidades
    carregarPokemon();
}

function antPokemon() {
    currentPokemonId--;
    if (currentPokemonId < 1) {
        currentPokemonId = 1025;
    }
    habilidadesContainer.classList.remove('visible'); // Esconde o container de habilidades
    carregarPokemon();
}

function mostrarHabilidades(abilities) {
    habilidadesList.innerHTML = ''; // Limpa a lista de habilidades
    abilities.forEach(ability => {
        const li = document.createElement('li');
        li.textContent = ability.ability.name;
        habilidadesList.appendChild(li);
    });
    habilidadesContainer.classList.add('visible'); // Mostra o container de habilidades
}

nextButton.addEventListener('click', proxPokemon);
previousButton.addEventListener('click', antPokemon);

carregarPokemon();
