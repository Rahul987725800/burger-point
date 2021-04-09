<script>
  import { onDestroy } from 'svelte';
  import Bun from './Bun.svelte';
  import BurgerStore from '../../store/BurgerStore.js';
  export let localBurgerIngredients = null;
  let ingredients = [];
  const initIngredients = burger => {
    let ings = [];
    for (let ing in burger) {
      for (let i = 0; i < burger[ing]; i++) {
        ings.push(ing);
      }
    }
    ingredients = ings;
  };
  if (localBurgerIngredients) {
    initIngredients(localBurgerIngredients);
  } else {
    const unsubscribe = BurgerStore.subscribe(state => {
      initIngredients(state.ingredients);
    });
    onDestroy(unsubscribe);
  }
</script>

<!-- html -->
<div>
  <Bun type="upper" />
  {#each ingredients as ingredient, i (i)}
    <Bun flavour type={ingredient} />
  {/each}

  <Bun type="lower" />
</div>

<!-- /html -->
<style>
  div {
    height: 60vh;
    overflow: auto;
  }
</style>
