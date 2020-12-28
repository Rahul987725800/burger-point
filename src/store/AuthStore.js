import { writable } from 'svelte/store';
import activeLink from './RouterStore';
import { links } from '../utils';
const initialState = {
  token: null,
  userId: null,
  error: '',
  loading: false,
  user: null,
};

const { subscribe, set, update } = writable(initialState);
let authSuccess = (token, userId) => {
  update(state => {
    state.token = token;
    state.userId = userId;
    state.error = '';
    state.loading = false;
    return state;
  });
  activeLink.set(links.home);
};
let authFail = error => {
  update(state => {
    state.error = error;
    state.loading = false;
    return state;
  });
};
let authLogout = () => {
  update(state => {
    state.token = null;
    state.userId = null;
    return state;
  });
};

let authStartLoading = () => {
  update(state => {
    state.error = '';
    state.loading = true;
    return state;
  });
};
let dismissError = () => {
  update(state => {
    state.error = '';
    return state;
  });
};
let setUser = user => {
  update(state => {
    state.user = user;
    return state;
  });
};
let loginOrSignup = async (data, signup) => {
  authStartLoading();
  const apiKey = 'AIzaSyA2_eRIKICtL_MeRGn2aFJvSZB87djxas4';
  const authData = {
    email: data.email,
    password: data.password,
    returnSecureToken: true,
  };
  let url = signup
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })
    .then(res => res.json())
    .then(async response => {
      if (response.error && response.error.code === 400) {
        throw new Error(response.error.message);
      }
      // console.log(response);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('userId', response.localId);
      localStorage.setItem(
        'expirationDate',
        new Date(new Date().getTime() + +response.expiresIn * 1000)
      );
      if (signup) {
        await registerUser(response.localId, data);
        await fetchUser(response.localId);
      } else {
        await fetchUser(response.localId);
      }
      authSuccess(response.idToken, response.localId);
      checkAuthTimeout(+response.expiresIn);
    })
    .catch(error => {
      // console.log(error);
      authFail(error.message);
    });
};
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  authLogout();
};
const checkAuthTimeout = expirationTime => {
  setTimeout(() => {
    logout();
  }, expirationTime * 1000);
};
const authCheckState = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    logout();
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (new Date() < expirationDate) {
      const userId = localStorage.getItem('userId');
      await fetchUser(userId);
      authSuccess(token, userId);
      checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      );
    } else {
      logout();
    }
  }
};
const registerUser = (userId, data) => {
  return fetch('https://svelte-burger-default-rtdb.firebaseio.com/users.json', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      email: data.email,
      username: data.username,
    }),
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // user is registered now
    })
    .catch(err => console.log(err));
};
const fetchUser = userId => {
  const queryParams = `?orderBy="userId"&equalTo="${userId}"&limitToFirst=1`;
  return fetch(
    'https://svelte-burger-default-rtdb.firebaseio.com/users.json' + queryParams
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data[Object.keys(data)[0]]);
      setUser(data[Object.keys(data)[0]]);
    })
    .catch(err => console.log(err));
};
export default {
  subscribe,
  loginOrSignup,
  authCheckState,
  logout,
  dismissError,
};
