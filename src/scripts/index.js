/* Monte sua lógica aqui */

import { loadPokemons, searchPokemon } from './requests.js';

let offset = 0;

const createPokemonListItem = (pokemon) => {
  const listItem = document.createElement('li');
  listItem.classList.add('pokemonList__listItem');

  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.image;
  const pokemonName = document.createElement('p');
  pokemonName.innerHTML = pokemon.name;

  listItem.append(pokemonImage, pokemonName);

  return listItem;
};

const handleBtns = () => {
  const backBtn = document.querySelector('#backBtn');
  const nextBtn = document.querySelector('#nextBtn');

  backBtn.addEventListener('click', () => {
    loadPage(offset - 20);
    offset = offset - 20;
  });

  nextBtn.addEventListener('click', () => {
    loadPage(offset + 20);
    offset = offset + 20;
  });
};

const handleSearch = () => {
  const searchForm = document.querySelector('.header__search');
  const inputValue = document.querySelector('.header__searchInput');

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchResult = await searchPokemon(inputValue.value.toLowerCase());
    handleResult(searchResult);
  });
};

const handleResult = (pokemon) => {
  const listElement = document.querySelector('.pokemonList__list');
  listElement.innerHTML = '';
  const pokemonList = document.querySelector('.pokemonList');
  const pagination = document.querySelector('.pagination');
  pokemonList.removeChild(pagination);

  if (pokemon.error) {
    listElement.innerHTML = `<p style='font-size: 1.5rem; color: white '>${pokemon.error} </p>`;
  } else {
    listElement.appendChild(
      createPokemonSearchItem(pokemon.name, pokemon.sprites.front_default),
    );
  }

  const reloadBtn = document.createElement('button');
  reloadBtn.classList.add('pagination__btn');
  reloadBtn.innerHTML = 'Limpar busca';
  listElement.appendChild(reloadBtn);

  reloadBtn.addEventListener('click', () => {
    window.location.reload();
  });
};

const createPokemonSearchItem = (name, image) => {
  const listItem = document.createElement('li');
  listItem.classList.add('pokemonList__listItem');

  const pokemonImage = document.createElement('img');
  pokemonImage.src = image;
  const pokemonName = document.createElement('p');
  pokemonName.innerHTML = name;

  listItem.append(pokemonImage, pokemonName);

  return listItem;
};

const loadPage = async (offset) => {
  handleBtns();
  handleSearch();

  const listElement = document.querySelector('.pokemonList__list');
  listElement.innerHTML = '';

  const pokemons = await loadPokemons(offset);

  const solvePromises = await Promise.all(pokemons).then((pokemon) => pokemon);

  solvePromises.map((pokemon) =>
    listElement.appendChild(createPokemonListItem(pokemon)),
  );
};

loadPage(offset);
