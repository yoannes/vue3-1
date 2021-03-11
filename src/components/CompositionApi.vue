<template>
  <div class="mt">
    <div>{{ c }}: {{ a }}</div>
    <button @click="inc">++</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    c: { type: String, defualt: null },
  },

  setup(props, { emit }) {
    const a = ref(0);

    const inc = () => {
      console.log('vamos inc');
      a.value += 1;

      emit('inc');
    };

    return { a, inc };
  },
};
</script>

<style lang="scss" scoped>
.mt {
  margin-top: 50px;
}
</style>
