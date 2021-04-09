<template>
  <div>
    <div class="flex flex-wrap">
      <div v-for="card in cart" :key="card.id">
        <card-component :card="card" isCart @on-remove="removeHandler(card)" />
      </div>
    </div>

    <div class="checkout-footer">
      <div>
        Total items: <strong>{{cart.length}}</strong>
      </div>
      <div>
        Total: R$ <strong>{{total}}</strong>
      </div>

      <btn>Finalizar compra</btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Card } from '@/modules/cards';
import useMe from '@/modules/me';
import CardComponent from '@/components/molecules/Card.vue';
import { computed, defineComponent } from 'vue';
import Btn from '@/components/atoms/Btn.vue';

export default defineComponent({
  components: { CardComponent, Btn },
  setup() {
    const me = useMe();

    const cart = computed(() => me.state.cart);
    const total = computed(() => me.state.cart.map((x) => x.price).reduce((a, b) => a + b, 0));

    const removeHandler = (card: Card) => {
      me.mutations.removeCardFromCart(card.id);
    };

    return {
      cart,
      removeHandler,
      total,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkout-footer {
  margin-top: 50px;
  text-align: left;
}
</style>
