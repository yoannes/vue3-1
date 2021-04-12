import { reactive, readonly, computed } from 'vue';
import { getMe } from '@/mockServer/server';
import { Card } from './cards';

export interface State {
  list: Card[];
  cart: Card[];
  balance: number;
}

// --------------------- State ------------------------ //
const state: State = reactive({
  list: [],
  cart: [],
  balance: 0,
});
// ---------------------------------------------------- //

// --------------------- Mutations ---------------------- //
const mutations = {
  setBalance(newBalance: number) {
    state.balance = newBalance;
  },

  addCardToCart(card: Card) {
    state.cart.push(card);
  },

  removeCardFromCart(cardId: number) {
    const idx = state.cart.findIndex((card) => card.id === cardId);
    if (idx > -1) {
      state.cart.splice(idx, 1);
    }
  },
};
// ------------------------------------------------------ //

// --------------------- Actions ---------------------- //
const actions = {
  async getMe() {
    // Vamos buscar no servidor os dados atualizados
    const res = await getMe();
    if (res.status === 'OK') {
      mutations.setBalance(res.result.balance);
      return true;
    }

    return false;
  },

  async buy() {
    const body = {
      cards: state.cart.map((card: Card) => card.id),
    };

    // TODO: Aqui foi chamada pro servidor e voltou ok.

    body.cards.forEach((cardId) => {
      const cardIdx = state.cart.findIndex((c) => c.id === cardId);
      console.log(cardId, state.cart[cardIdx]);

      // 1. Adicionar o card na lista do usuário
      state.list.push(state.cart[cardIdx]);

      // 2. Remover o card do carrinho
      state.cart.splice(cardIdx, 1);
    });

    return 'OK';
  },

  async sell(card: Card) {
    const body = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      card_id: card.id,
    };

    // TODO: Aqui foi chamada pro servidor e voltou ok.

    const cardIdx = state.list.findIndex((c) => c.id === card.id);

    // 1. Remover o card da list do user
    state.list.splice(cardIdx, 1);
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

export default function useMe() {
  return readonly({
    state,
    actions,
    mutations,
    getters,
  });
}
