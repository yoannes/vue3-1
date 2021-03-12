<template>
  <div>
    <div>Hello</div>
    <div>Total: {{ total }}</div>

    <options c="Componente options 1" :total="total" @inc="incHandler" />
    <options c="Componente options 2" @inc="incHandler" />
    <options c="Componente options 3" @inc="incHandler" />

    <composition-api c="Componente composition 1" @inc="incHandler" />
    <composition-api c="Componente composition 2" @inc="incHandler" />
    <composition-api c="Componente composition 3" @inc="incHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useAuth from '@/modules/auth';
import Options from '@/components/Options.vue';
import CompositionApi from '@/components/CompositionApi.vue';

export default defineComponent({
  components: { Options, CompositionApi },

  setup() {
    const auth = useAuth();
    const total = ref(0);

    console.log('Components.vue', auth.state.name);

    const incHandler = () => {
      console.log('total', total.value);
      total.value += 1;
    };

    return { total, incHandler };
  },
});
</script>
