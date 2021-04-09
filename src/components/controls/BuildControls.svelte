<script>
  import { buttonClasses, links } from '../../utils.js';
  import Button from '../../shared/Button.svelte';
  import Control from './Control.svelte';
  import OrderDialog from './OrderDialog.svelte';
  import activeLink from '../../store/RouterStore';

  import BurgerStore from '../../store/BurgerStore.js';
  import AuthStore from '../../store/AuthStore.js';
  import Loader from '../../shared/Loader.svelte';

  import { onDestroy } from 'svelte';
  let showOrderDialog = false;
  let openOrderDialog = () => {
    showOrderDialog = true;
  };
  let closeOrderDialog = () => {
    showOrderDialog = false;
  };

  let ingredients = null;
  let purchasable = false;
  const unsubscribe = BurgerStore.subscribe(state => {
    ingredients = state.ingredients;
    // console.log('checking purchasable');
    purchasable = false;
    for (let ing in ingredients) {
      if (ingredients[ing] > 0) {
        purchasable = true;
        break;
      }
    }
  });
  onDestroy(unsubscribe);
  let loading = false;
  let loadingMessage = '';
  let orderContinueHandler = () => {
    // console.log('order continued');
    closeOrderDialog();
    if (!$AuthStore.token) {
      loading = true;
      loadingMessage = 'Redirecting to login page...';
      setTimeout(() => {
        activeLink.set(links.auth);
      }, 1000);
    } else {
      activeLink.set(links.orderConfirmation);
    }
  };
</script>

<!-- html -->
<div>
  {#if showOrderDialog}
    <OrderDialog
      close={closeOrderDialog}
      {ingredients}
      {orderContinueHandler}
    />
  {/if}
  {#if loading}
    <Loader {loadingMessage} />
  {/if}
  {#each Object.keys(ingredients) as ing (ing)}
    <Control type={ing} />
  {/each}
  <p />
  <Button
    type={buttonClasses.primary}
    on:click={openOrderDialog}
    disabled={!purchasable}
  >
    ORDER NOW
  </Button>
</div>

<!-- /html -->
<style lang="scss">
  div {
    text-align: center;
    margin: auto;
    padding: 1rem;
  }
</style>
