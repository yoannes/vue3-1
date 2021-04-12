<template>
  <div>
    <div class="flex flex-wrap">
      <div v-for="card in cart" :key="card.id">
        <card-component :card="card" isCart @on-remove="removeHandler(card)" />
      </div>

      <div v-if="!cart.length">Seu carrinho esta vazio</div>
    </div>

    <div class="checkout-footer">
      <div>
        Total items: <strong>{{ cart.length }}</strong>
      </div>
      <div>
        Total: R$ <strong>{{ total }}</strong>
      </div>

      <btn @click="buyHandler">Finalizar compra</btn>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Card } from '@/modules/cards';
import useMe from '@/modules/me';
import CardComponent from '@/components/molecules/Card.vue';
import Btn from '@/components/atoms/Btn.vue';

export default defineComponent({
  components: { CardComponent, Btn },
  setup() {
    const router = useRouter();
    const me = useMe();

    const cart = computed(() => me.state.cart);
    const total = computed(() => me.state.cart.map((x) => x.price).reduce((a, b) => a + b, 0));

    const removeHandler = (card: Card) => {
      me.mutations.removeCardFromCart(card.id);
    };

    const buyHandler = () => {
      me.actions.buy().then((res) => {
        console.log('res', res);
        if (res === 'OK') {
          router.push({ name: 'Home' });
        }
      });
    };

    return {
      cart,
      removeHandler,
      total,
      buyHandler,
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
