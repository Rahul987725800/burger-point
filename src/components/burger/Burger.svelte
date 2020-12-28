<script>
  import { onDestroy } from 'svelte';
  import Bun from './Bun.svelte';
  import BurgerStore from '../../store/BurgerStore.js';

  let ingredients = [];
  const unsubscribe = BurgerStore.subscribe(state => {
    let ings = [];
    for (let ing in state.ingredients) {
      for (let i = 0; i < state.ingredients[ing]; i++) {
        ings.push(ing);
      }
    }
    ingredients = ings;
  });

  onDestroy(unsubscribe);
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
    height: 45vh;
    overflow: auto;
  }
</style>
