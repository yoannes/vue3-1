<template>
  <div class="header">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |

    <span v-if="!isLoggedIn">
       <router-link to="/login">Login</router-link>
    </span>

    <span v-else>
      Bem vindo: <strong>{{username}}</strong> |
      <span @click="logoutHandler">Logout</span>
    </span>

    <div class="header-balance">Balance: <strong>{{balance}}</strong></div>

  </div>
</template>

<script lang="ts">
import useAuth from '@/modules/auth';
import useMe from '@/modules/me';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: {},

  setup() {
    const auth = useAuth();
    const me = useMe();

    const isLoggedIn = computed(() => auth.state.token);
    const username = computed(() => auth.state.username);
    const balance = computed(() => me.state.balance);

    const logoutHandler = () => {
      auth.actions.logout();
    };

    return {
      isLoggedIn,
      username,
      balance,
      logoutHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  border: 1px solid black;
}

.header-balance {
  margin-left: 20px;
}
</style>
