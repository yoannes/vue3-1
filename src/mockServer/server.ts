const user: {[key: string]: any} = {
  id: 1,
  name: 'fulano',
  username: 'asd',
  password: 'asd',
  status: 'Ok',
  token: '',
  balance: 0,
};

const data = window.localStorage.getItem('tmp_marketplace_vue31');
if (data) {
  const parsedData = JSON.parse(data);
  Object.keys(parsedData).forEach((k) => {
    user[k] = parsedData[k];
  });
}

export const Signup = async (name: string, username: string, password: string) => {
  console.log('signup');

  user.name = name;
  user.username = username;
  user.password = password;
  user.token = 'superUltraLongToken';
  user.balance = Math.floor(Math.random() * 1000);

  window.localStorage.setItem('tmp_marketplace_vue31', JSON.stringify(user));

  return {
    status: 'OK',
    result: {
      id: user.id,
      name: user.name,
      username: user.username,
      token: user.token,
    },
  };
};

export const Login = async (username: string, password: string) => {
  if (username !== user.username) {
    return { status: 'WRONG_USER' };
  }

  if (password !== user.password) {
    return { status: 'WRONG_PASSWORD' };
  }

  return {
    status: 'OK',
    result: {
      id: user.id,
      name: user.name,
      username: user.username,
      token: 'superUltraLongToken',
    },
  };
};

export const getMe = async () => ({
    status: 'OK',
    result: {
      id: user.id,
      name: user.name,
      username: user.username,
      balance: user.balance,
    },
  });
