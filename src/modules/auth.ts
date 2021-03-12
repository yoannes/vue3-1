import { readonly } from 'vue';

interface State {
  id: number;
  name: string;
  token: string;
}

const state: State = {
  id: 0,
  name: 'nome',
  token: 'token',
};

export default function useAuth() {
  return readonly({
    state,
  });
}
