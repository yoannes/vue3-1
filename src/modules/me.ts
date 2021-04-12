import { getMe } from '@/mockServer/server';
import { reactive, readonly } from 'vue';
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
};
// ---------------------------------------------------- //

export default function useMe() {
  return readonly({
    state,
    actions,
    mutations,
  });
}
