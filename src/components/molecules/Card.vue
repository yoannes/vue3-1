<template>
  <div class="card">
    <img :src="card.sprites.frontDefault" />

    <div>{{ card.id }} - {{ card.name }}</div>
    <div>
      Price: R$ <span>{{card.price}}</span>
    </div>

    <btn v-if="!isCart" @click="$emit('on-buy')">Buy</btn>
    <btn v-else @click="$emit('on-remove')">Remove</btn>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Btn from '../atoms/Btn.vue';

export default defineComponent({
  components: { Btn },

  props: {
    card: { type: Object, required: true },
    isCart: { type: Boolean, default: false },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;

  width: 200px;
  height: 200px;
}
</style>
