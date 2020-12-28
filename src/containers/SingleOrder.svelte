<script>
  import { activeOrder } from '../store/OrdersStore';
  let order = $activeOrder;
  // console.log('order mounted');
</script>

<!-- html -->
<div class="order">
  <p>Single order details</p>
  {#if order}
    {#each Object.keys(order.ingredients) as ing (ing)}
      <p>{ing} - {order.ingredients[ing]}</p>
    {/each}
  {:else}
    <!-- if we reach order through route directly  -->
    <p>No order selected</p>
  {/if}
</div>

<!-- /html -->
<style>
  .order {
    width: 50vw;
    height: 50vh;
    background-color: white;
  }
</style>
