import { reactive, readonly } from 'vue';

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
  busy: boolean;
}
// ---------------------------------------------------- //

// --------------------- State ------------------------ //
const state: State = reactive({
  list: [],
  busy: false,
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
      attack: card.attack,
      defence: card.defence,
    };

    // Se existir -> edita;
    // se nao     -> adiciona;
    if (idx === -1) {
      state.list.push(newCard);
    } else {
      state.list[idx] = newCard;
    }
  },
};
// ---------------------------------------------------- //

// --------------------- Actions ---------------------- //
const actions = {
  loadCards() {
    mutations.setBusy(true);

    const mockData = [
      {
        id: 1,
        name: 'Pikachu',
        price: 10,
        attack: 5,
        defence: 10,
        url: '',
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
    ];

    console.log('Vamos carregar os cards');

    setTimeout(() => {
      console.log('depois de 1s');
      mockData.forEach((card) => {
        mutations.processCard(card);
      });

      mutations.setBusy(false);
    }, 5000);
  },
};
// ---------------------------------------------------- //

export default function useCards() {
  return readonly({
    state,
    actions,
    mutations,
  });
}
