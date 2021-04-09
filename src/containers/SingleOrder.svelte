<script>
  import { activeOrder } from '../store/OrdersStore';
  import Burger from '../components/burger/Burger.svelte';
  import { randomStatus } from '../utils.js';
  let order = $activeOrder;
  // console.log('order mounted');
  // console.log(order);
</script>

<!-- html -->
<div class="order">
  <h1>Order details</h1>
  {#if order}
    <div class="burger">
      <Burger localBurgerIngredients={order.ingredients} />
    </div>
    <div class="other-details">
      <p>Status: {randomStatus()}</p>
      <p>Expected Delivery: 3 days</p>
      <p>Order Date : {new Date(order.time).toLocaleString()}</p>
      <p>Phone: {order.phone}</p>
      <p>Address:</p>
      <p>Line 1 : {order.address.inputAddress.address1}</p>
      <p>Line 2 : {order.address.inputAddress.address2}</p>
      <p>Pincode: {order.address.Pincode}</p>
    </div>
  {:else}
    <!-- if we reach order through route directly  -->
    <p>No order selected</p>
  {/if}
</div>

<!-- /html -->
<style lang="scss">
  .order {
    h1 {
      text-align: center;
    }
  }
  .burger {
    width: 30%;
    margin: 1rem auto;
  }
  @media (max-width: 900px) {
    .burger {
      width: 60%;
    }
  }
  .other-details {
    padding: 4rem;
  }
</style>
