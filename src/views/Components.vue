<template>
  <div>
    <div>Hello</div>

    {{ listOfCards.length }}

    Pokemons:
    <div v-if="listOfCards.length" style="border: 1px solid black">
      <div v-for="card in listOfCards" :key="card.id" class="card">
        {{ card }}
      </div>
    </div>

    <div style="margin-top: 100px">Total: {{ total }}</div>

    <options c="Componente options 1" :total="total" @inc="incHandler" />
    <options c="Componente options 2" @inc="incHandler" />
    <options c="Componente options 3" @inc="incHandler" />

    <composition-api c="Componente composition 1" @inc="incHandler" />
    <composition-api c="Componente composition 2" @inc="incHandler" />
    <composition-api c="Componente composition 3" @inc="incHandler" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import useCards from '@/modules/cards';
import Options from '@/components/Options.vue';
import CompositionApi from '@/components/CompositionApi.vue';

export default defineComponent({
  components: { Options, CompositionApi },

  setup() {
    const cards = useCards();
    const total = ref(0);

    console.log('Components.cards', cards);

    // Computed functions
    const listOfCards = computed(() => cards.state.list);

    // Functions
    const incHandler = () => {
      console.log('total', total.value);
      total.value += 1;
    };

    return { total, incHandler, listOfCards };
  },
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid green;
  margin: 10px;
}
</style>
