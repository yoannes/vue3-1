<template>
  <div class="home">
    Bom dia usuario, seja bem vindo a super loja de cards Pokemon

    <div>lista dos pokemons</div>

    <div class="home-card-container flex flex-wrap">
      <div v-for="pokemon in list" :key="pokemon.id" class="home-card">
        <img :src="pokemon.sprites.frontDefault" />
        <div>{{ pokemon.id }} - {{ pokemon.name }}</div>

        <button @click="buyHandler(pokemon.id)">Buy</button>
      </div>
    </div>

    <btn @click="loadMoreHandler">Carregar mais</btn>

  </div>
</template>

<script lang="ts">
import useCards from '@/modules/cards';
import { computed, defineComponent } from 'vue';
import Btn from '@/components/atoms/Btn.vue';

export default defineComponent({
  components: { Btn },
  name: 'Home',

  setup() {
    const cards = useCards();

    const list = computed(() => cards.state.list);

    const loadMoreHandler = () => {
      cards.actions.loadMore();
    };

    const buyHandler = (id: number) => {
      console.log('vamos comprar', id);
    };

    cards.actions.loadCards();

    return {
      list,
      loadMoreHandler,
      buyHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-card {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;

  width: 200px;
  height: 200px;
}

.home-card-container {
  border: 1px solid black;
  max-height: 40vh;
  overflow-y: auto;
}
</style>
