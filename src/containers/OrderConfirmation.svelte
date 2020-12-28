<script>
  import AuthStore from '../store/AuthStore';
  import OrdersStore from '../store/OrdersStore';
  import BurgerStore from '../store/BurgerStore';
  import activeLink from '../store/RouterStore';
  import { links } from '../utils';
  import Loader from '../shared/Loader.svelte';

  let loading = false;
  let loadingMessage = '';
  let error = false;
  const confirmOrderHandler = () => {
    loading = true;
    error = false;
    loadingMessage = 'Placing your order...';
    OrdersStore.sendOrder($AuthStore.token, $AuthStore.userId, {
      ingredients: $BurgerStore.ingredients,
      delivery: 'priority',
      time: new Date(),
      phone: ['9877'],
      address: 'some address',
      user: $AuthStore.user,
    })
      .then(() => {
        activeLink.set(links.orders);
        loading = false;
      })
      .catch(err => {
        // console.log(err);
        loadingMessage = 'Some error occurred!';
        error = true;
        setTimeout(() => {
          loading = false;
        }, 2000);
      });
  };
</script>

<!-- html -->
{#if loading}
  <Loader {loadingMessage} {error} />
{/if}
<p>Order confirmation page</p>
<button on:click={confirmOrderHandler}>confirm order</button>

<!-- /html -->
<style>
</style>
