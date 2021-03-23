<template>
  <div class="header">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
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
.header {
  border: 1px solid black;
}
</style>
