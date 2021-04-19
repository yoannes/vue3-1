<template>
  <div class="home">
    Bom dia usuario, seja bem vindo a super loja de cards Pokemon

    <div ref="car" style="width: 400px"></div>

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
import { defineComponent, onMounted, ref } from 'vue';
import Btn from '@/components/atoms/Btn.vue';
import useMe from '@/modules/me';
import CardComponent from '@/components/molecules/Card.vue';

import Carrossel from '@/util/carrossel';
import '@/util/carrossel/css.css';

export default defineComponent({
  components: { Btn, CardComponent },
  name: 'Home',

  setup() {
    const cards = useCards();
    const me = useMe();
    const car = ref();

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

    onMounted(() => {
      const options = {
        el: car.value,
        images: [
          'https://images-na.ssl-images-amazon.com/images/I/71an9eiBxpL._AC_SL1500_.jpg',
          'https://jp.techcrunch.com/wp-content/uploads/2020/05/00100trportrait_00100_burst20200506153653558_cover.jpg',
        ],
      };
      const carrossel = new Carrossel(options);
      console.log('xxxxxxx', carrossel);
    });

    return {
      list,
      myList,
      loadMoreHandler,
      buyHandler,
      sellHandler,
      car,
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
