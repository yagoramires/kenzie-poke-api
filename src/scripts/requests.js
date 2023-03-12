/* Monte a lógica das requisições aqui */
const URL = 'https://pokeapi.co/api/v2';

const fetchPokemons = async (offset) => {
  const req = await fetch(URL + '/pokemon/?offset=' + offset + '&limit=20');
  const res = await req.json();

  const pokemonData = res.results.map(async (pokemon) => ({
    name: pokemon.name,
    image: await fetchPokemonData(pokemon.url),
  }));

  return pokemonData;
};

const fetchPokemonData = async (url) => {
  const req = await fetch(url);
  const res = await req.json();

  return res.sprites.front_default;
};

export const loadPokemons = async (page) => {
  const pokemonList = await fetchPokemons(page);

  return pokemonList;
};

export const searchPokemon = async (pokemon) => {
  const req = await fetch(URL + '/pokemon/' + pokemon);

  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    return { error: 'Nenhum pokémon encontrado.' };
  }

  console.log(res);
};
