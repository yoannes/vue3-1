import { readonly } from 'vue';
import { Login } from '@/mockServer/server';

interface State {
  id: number;
  name: string;
  username: string;
  token: string;
}

const state: State = {
  id: 0,
  name: '',
  username: '',
  token: '',
};

const mutations = {
  login(obj: any) {
    state.id = obj.id;
    state.name = obj.name;
    state.username = obj.username;
    state.token = obj.token;
  },
};

const actions = {
  async login(username: string, password: string) {
    console.log('sou action, vamos logar', username, password);

    const res = await Login(username, password);

    if (res.status === 'OK') {
      mutations.login(res.result);
    }

    return res;
  },

};

export default function useAuth() {
  return readonly({
    state,
    actions,
  });
}
