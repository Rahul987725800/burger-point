<script>
  import activeLink from '../../store/RouterStore';
  import { links } from '../../utils';
  import { slide } from 'svelte/transition';
  import { activeOrder } from '../../store/OrdersStore';
  import Card from '../../shared/Card.svelte';

  export let orders;
</script>

<!-- html -->
<div class="container">
  {#each orders as order, i (i)}
    <Card>
      {#each Object.keys(order.ingredients) as ing (ing)}
        <p>{ing} - {order.ingredients[ing]}</p>
      {/each}
    </Card>
  {/each}
</div>

<!-- /html -->
<style>
  .container {
    padding: 1rem;
  }
</style>
