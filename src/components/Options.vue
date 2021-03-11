<template>
  <div style="margin-top: 50px">
    <div>{{ c }}: {{ a }}</div>

    <button @click="inc">++</button>
  </div>
</template>

<script>
export default {
  props: {
    c: { type: String, defualt: null },
    total: { type: Number, default: 0 },
  },

  data() {
    return {
      a: 0,
      b: 'sou o b',
    };
  },

  methods: {
    inc() {
      console.log('Inc', this.a);
      this.a += 1;

      this.$emit('inc');
    },
  },
};
</script>

<style>
</style>
