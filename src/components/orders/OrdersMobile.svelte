<script>
  import activeLink from '../../store/RouterStore';
  import { links, randomStatus } from '../../utils';
  import { activeOrder } from '../../store/OrdersStore';
  import Card from '../../shared/Card.svelte';
  import Burger from '../burger/Burger.svelte';
  export let orders;
</script>

<!-- html -->
<div class="container">
  {#each orders as order, i (i)}
    <div
      class="wrapper"
      on:click={() => {
        activeOrder.set(order);
        activeLink.set(links.order);
      }}
    >
      <Card>
        <div class="contents">
          <p>Status: {randomStatus()}</p>
          <p>{new Date(order.time)}</p>
          <div class="burger">
            <Burger localBurgerIngredients={order.ingredients} />
          </div>
        </div>
      </Card>
    </div>
  {/each}
</div>

<!-- /html -->
<style>
  .container {
    padding: 1rem;
  }
  .wrapper {
    padding: 1rem;
  }
  .contents {
    padding: 1rem;
  }
  .burger {
    width: 90%;
    margin: 1rem auto;
  }
</style>
