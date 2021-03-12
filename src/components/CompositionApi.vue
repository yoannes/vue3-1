<template>
  <div class="mt">
    <div>{{ c }}: {{ a }}</div>
    <button @click="inc">++</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import useAuth from '@/modules/auth';

export default {
  props: {
    c: { type: String, defualt: null },
  },

  setup(props, { emit }) {
    const auth = useAuth();
    const a = ref(0);

    console.log('CompositionApi.vue', auth.state.id);

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
