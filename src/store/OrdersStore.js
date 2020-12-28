import { writable } from 'svelte/store';
const initialState = {
  orders: {},
};

const { subscribe, set, update } = writable(initialState);
export const activeOrder = writable(null);

const updateOrders = orders => {
  // console.log('updating orders');
  update(state => {
    state.orders = orders;
    return state;
  });
};
const getOrders = (token, userId) => {
  const queryParams =
    '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  return fetch(
    'https://svelte-burger-default-rtdb.firebaseio.com/orders.json' +
      queryParams
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (data.error) {
        throw data.error;
        // so we can catch and handle it
        // eg when token not valid
      }
      return data && !data.error ? data : {};
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
const sendOrder = (token, userId, details) => {
  return fetch(
    'https://svelte-burger-default-rtdb.firebaseio.com/orders.json?auth=' +
      token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        details,
      }),
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      // console.log(data)
      if (data.error) {
        throw data.error;
        // so we can catch and handle it
        // eg when token not valid
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
export default {
  subscribe,
  getOrders,
  updateOrders,
  sendOrder,
};
