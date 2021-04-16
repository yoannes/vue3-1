import axios from 'axios';
import { computed, reactive, readonly } from 'vue';

// ------------------ Interfaces ---------------------- //

interface Sprite {
  frontDefault: string;
}

export interface Card {
  id: number;
  name: string;
  sprites: Sprite;
  price: number;
  abilities?: [];
  baseExperience?: number;
  forms?: [];
  gameIndices?: [];
  height?: number;
  heldItems?: [];
  is_default?: boolean;
  locationAreaEncounters?: string;
  moves?: [];
  order?: number;
  pastTypes?: [];
  species?: {};
  stats?: [];
  types?: [];
  weight?: number;
}

interface State {
  list: Card[];
  busy: boolean;
  nextUrl: string;
}
// ---------------------------------------------------- //

// --------------------- State ------------------------ //
const state: State = reactive({
  list: [],
  busy: false,
  nextUrl: '',
});
// ---------------------------------------------------- //

// ------------------- Mutations ---------------------- //
const mutations = {
  setBusy(newValue: boolean) {
    state.busy = newValue;
  },

  processCard(card: any) {
    // Verificar se existe, buscando o index
    const idx = state.list.findIndex((x) => x.id === card.id);

    // Criar um objeto novo
    const newCard: Card = {
      id: card.id,
      name: card.name,
      price: card.price,
      sprites: {
        frontDefault: card.sprites.front_default,
      },
    };

    // Se existir -> edita;
    // se nao     -> adiciona;
    if (idx === -1) {
      state.list.push(newCard);
    } else {
      state.list[idx] = newCard;
    }
  },

  setNextUrl(url: string) {
    state.nextUrl = url;
  },
};
// ---------------------------------------------------- //

// --------------------- Getters ---------------------- //
const getters = {
  sortedList() {
    return computed(() => state.list.sort((a, b) => a.id - b.id));
  },
};
// ---------------------------------------------------- //

// --------------------- Actions ---------------------- //
const actions = {
  async loadCards() {
    mutations.setBusy(true);

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');

    mutations.setNextUrl(res.data.next);

    res.data.results.forEach((pokemon: any) => {
      actions.loadPokemon(pokemon.url);
    });
  },

  async loadMore() {
    axios.get(state.nextUrl).then((res) => {
      // console.log(res);

      mutations.setNextUrl(res.data.next);

      res.data.results.forEach((pokemon: any) => {
        actions.loadPokemon(pokemon.url);
      });
    });
  },

  async loadPokemon(url: string) {
    const p = await axios.get(url);

    const card = p.data;
    card.price = Math.floor(Math.random() * 100);
    mutations.processCard(card);

    // results.forEach((pokemon: any) => {
    //   axios.get(pokemon.url).then((p) => {
    //     const card = p.data;
    //     card.price = Math.floor(Math.random() * 100);
    //     mutations.processCard(card);
    //   });
    // });
  },
};
// ---------------------------------------------------- //

export default function useCards() {
  return readonly({
    state,
    actions,
    mutations,
    getters,
  });
}
