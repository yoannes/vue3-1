import { readonly } from 'vue';

// ------------------ Interfaces ---------------------- //
interface Card {
  id: number;
  name: string;
  price: number;
  attack: number;
  defence: number;
}

interface State {
  list: Card[];
}
// ---------------------------------------------------- //

// --------------------- State ------------------------ //
const state: State = {
  list: [
    {
      id: 1,
      name: 'Pikachu',
      price: 10,
      attack: 5,
      defence: 10,
    },
    {
      id: 2,
      name: 'Bulbasaur',
      price: 10,
      attack: 5,
      defence: 10,
    },
    {
      id: 3,
      name: 'Charmander',
      price: 10,
      attack: 5,
      defence: 10,
    },
  ],
};
// ---------------------------------------------------- //

export default function useCards() {
  return readonly({
    state,
  });
}
