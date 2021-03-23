<template>
  <div class="login">
    <div>Username</div>
    <input
      v-model="username"
      ref="usernameEl"
      type="text"
      @keyup="usernameHandler"
    />

    <div>Password</div>
    <input
      v-model="password"
      ref="passwordEl"
      @keyup="passwordHandler"
      type="password"
    />

    <div>
      <button @click="login">Login</button>
    </div>

    <div>
      Não tem conta? <router-link to="/signup">Cadastre-se aqui</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, reactive, ref, toRefs,
} from 'vue';

export default defineComponent({
  components: {},

  setup() {
    const usernameEl = ref();
    const passwordEl = ref();
    const state = reactive({
      username: '',
      password: '',
    });

    const login = () => {
      console.log('vamos fazer o login', state.username, state.password);
    };

    const usernameHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && state.username) {
        console.log('apertou enter, vai pro password', passwordEl.value);
        passwordEl.value.focus();
      }
    };

    const passwordHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && state.username && state.password) {
        login();
      }
    };

    return {
      ...toRefs(state),
      login,
      usernameHandler,
      passwordHandler,
      usernameEl,
      passwordEl,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
}
</style>
