<template>
  <div class="home">
    Bom dia usuario, seja bem vindo a super loja de cards Pokemon

    <div style="margin-top: 30px">
      <div>lista dos seus pokemons</div>
      <div class="home-card-container flex flex-wrap">
        <div v-for="card in myList" :key="card.id">
          <card-component :card="card" @on-sell="sellHandler(card)" isMine />
        </div>
      </div>
    </div>

    <div style="margin-top: 30px">
      <div>lista dos pokemons</div>

      <div class="home-card-container flex flex-wrap">
        <div v-for="card in list" :key="card.id">
          <card-component :card="card" @on-buy="buyHandler(card)" />
        </div>
      </div>

      <btn @click="loadMoreHandler">Carregar mais</btn>
    </div>
  </div>
</template>

<script lang="ts">
import useCards, { Card } from '@/modules/cards';
import { defineComponent } from 'vue';
import Btn from '@/components/atoms/Btn.vue';
import useMe from '@/modules/me';
import CardComponent from '@/components/molecules/Card.vue';

export default defineComponent({
  components: { Btn, CardComponent },
  name: 'Home',

  setup() {
    const cards = useCards();
    const me = useMe();

    const list = cards.getters.sortedList();
    const myList = me.getters.sortedList();

    const loadMoreHandler = () => {
      cards.actions.loadMore();
    };

    const buyHandler = (card: Card) => {
      me.mutations.addCardToCart(card);
    };

    const sellHandler = (card: Card) => {
      console.log('sell', card);
      me.actions.sell(card);
    };

    cards.actions.loadCards();

    return {
      list,
      myList,
      loadMoreHandler,
      buyHandler,
      sellHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-card-container {
  border: 1px solid black;
  max-height: 40vh;
  overflow-y: auto;
}
</style>
