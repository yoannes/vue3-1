import { reactive, readonly, computed } from 'vue';
import { buy, getMe, sell } from '@/mockServer/server';
import useCards, { Card } from './cards';

const cards = useCards();

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

  async setUserCards(newCards: any) {
    for (let i = 0; i < newCards.length; i++) {
      const _card = newCards[i];

      // Busca card do state
      let card = cards.state.list.find((x) => x.id === _card.id);
      if (!card) {
        // Se nao achar, busca card no API
        await cards.actions.loadPokemon(`https://pokeapi.co/api/v2/pokemon/${_card.id}/`);
        card = cards.state.list.find((x) => x.id === _card.id);
      }

      state.list.push({
        ...card,
        price: _card.price,
      } as Card);
    }
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
      mutations.setUserCards(res.result.cards);
      return true;
    }

    return false;
  },

  async buy() {
    const body = {
      cards: state.cart.map((card: Card) => ({
        id: card.id,
        price: card.price,
      })),
    };

    const res = await buy(body);
    console.log('res', res);
    if (res.status === 'OK') {
      body.cards.forEach((card) => {
        const cardIdx = state.cart.findIndex((c) => c.id === card.id);
        console.log(card.id, state.cart[cardIdx]);

        // 1. Adicionar o card na lista do usuário
        state.list.push(state.cart[cardIdx]);

        // 2. Remover o card do carrinho
        state.cart.splice(cardIdx, 1);
      });

      mutations.setBalance(res.result.balance);
    }

    return res.status;
  },

  async sell(card: Card) {
    const body = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      card_id: card.id,
      price: card.price,
    };

    const res = await sell(body);
    if (res.status === 'OK') {
      const cardIdx = state.list.findIndex((c) => c.id === card.id);

      // 1. Remover o card da list do user
      state.list.splice(cardIdx, 1);
      mutations.setBalance(res.result.balance);
    }
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
