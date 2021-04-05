<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import useAuth from './modules/auth';
import useMe from './modules/me';

export default defineComponent({
  components: { Header },

  setup() {
    const auth = useAuth();
    const me = useMe();

    auth.actions.loadUserData();

    if (auth.state.token) {
      me.actions.getMe().then((res) => {
        console.log('App.vue', res);
        if (!res) {
          auth.actions.logout();
        }
      });
    }

    return {};
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
