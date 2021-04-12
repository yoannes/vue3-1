<template>
  <div class="btn">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  border-radius: 5px;
  background: cyan;
  width: 150px;
  padding: 5px 10px 5px 10px;
  text-align: center;
}
</style>
