import { PokemonApiResult, PokemonBasicInfo } from "./types";

// page é zero-index
export async function listPokemons(page: number, limit: number) : Promise<PokemonApiResult> {
    const offset = (page - 1) * limit;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

    const list: PokemonApiResult = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await new Promise(resolve => setTimeout(
    () => {
      resolve(list);
    }, 1000));
}

export async function fakeTopPokemonList() {
  const pokemonList: PokemonBasicInfo[] = [];

  for (let i = 0; i < 10; i++) {
    let pokemon: PokemonBasicInfo = {
      id: i + 1,
      name: `Pokemon ${i+1}`
    };

    pokemonList.push(pokemon);
  }

  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(pokemonList);
    }, 1000);
  });
}

// export async function getPokemonInfo(id) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     const data = await response.json();

//     const info = {
//       number: data.id,
//       name: data.name,
//       male: data.sprites.front_default,
//       female: data.sprites.front_female,
//       type: data.types[0].type.name,
//     }

//     return info;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getAllPokemonNames() {
//   try {
//     const maxTry = 5; // não ir além disso
//     let limit = 500;
//     let offset = 0;
//     let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
//     const list = [];

//     let i = 0;
//     while (i < maxTry && url !== null) {
//       // console.info(`getAllPokemonNames: ${i} ${url}`);

//       const response = await fetch(url);
//       const data = await response.json();

//       for (let j = 0; j < data.results.length; j++) {
//         const obj = {
//           id: data.results[j].url.match(/(\d+)\/$/)[1],
//           name: data.results[j].name,
//         }

//         list.push(obj);
//       }

//       url = data.next;
//       i++;
//     }

//     return list;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getPokemonFullInfo(id) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }