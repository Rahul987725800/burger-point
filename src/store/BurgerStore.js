import { writable } from 'svelte/store';
const initialState = {
  ingredients: null,
};

const { subscribe, set, update } = writable(initialState);

const addIngredient = type => {
  // console.log(type);
  update(state => {
    state.ingredients[type]++;
    return state;
  });
};
const removeIngredient = type => {
  // console.log(type);
  update(state => {
    if (state.ingredients[type] > 0) {
      state.ingredients[type]--;
    }

    return state;
  });
};

const updateIngredients = ingredients => {
  update(state => {
    state.ingredients = ingredients;
    return state;
  });
};
const setIngredients = () => {
  return fetch(
    'https://svelte-burger-default-rtdb.firebaseio.com/ingredients.json'
  )
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      updateIngredients(data);
    })
    .catch(err => console.log(err));
};

export default {
  subscribe,
  addIngredient,
  removeIngredient,
  updateIngredients,
  setIngredients,
};
