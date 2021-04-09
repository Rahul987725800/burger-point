<script>
  import activeLink from '../../store/RouterStore';
  import { links, randomStatus } from '../../utils';
  import { slide } from 'svelte/transition';
  import { activeOrder } from '../../store/OrdersStore';

  export let orders;
  // console.log(orders);
</script>

<!-- html -->
<div class="container">
  {#each orders as order (order.id)}
    <div class="order">
      <div class="shown-part">
        <div
          class="ingredients-details"
          on:click={() => {
            activeOrder.set(order);
            activeLink.set(links.order);
          }}
        >
          {#each Object.keys(order.ingredients) as ing (ing)}
            <p>{ing} - {order.ingredients[ing]}</p>
          {/each}
        </div>

        <div class="toggle-buttons">
          {#if order.showDetails}
            <button
              on:click={() => {
                order.showDetails = false;
              }}
              ><span style="position: relative; bottom: .1rem;">&utrif;</span
              ></button
            >
          {:else}
            <button
              on:click={() => {
                order.showDetails = true;
              }}>&dtrif;</button
            >
          {/if}
        </div>
      </div>
      {#if order.showDetails}
        <div class="other-details" in:slide out:slide|local>
          <p>Status: {randomStatus()}</p>
          <p>Order Date : {new Date(order.time).toLocaleString()}</p>
        </div>
      {/if}
    </div>
  {:else}
    <p>No orders</p>
  {/each}
</div>

<!-- /html -->
<style lang="scss">
  .container {
    width: 80%;
    margin: auto;
  }
  .order {
    .shown-part {
      display: flex;
      align-items: center;
      .ingredients-details {
        transform: translateX(1rem);
        display: flex;
        flex: 1;
        border-bottom: 1px solid rgb(161, 161, 161);
        &:hover {
          background-color: rgba(226, 226, 226, 0.397);
          cursor: pointer;
        }
        p {
          text-transform: capitalize;
          margin: 2rem;
          @media (max-width: 900px) {
            margin: 1rem;
          }
        }
      }
      .toggle-buttons {
        transform: translateX(-3rem);

        button {
          width: 2rem;
          height: 2rem;
          transform: translateY(0.2rem);
          border-radius: 50%;
          padding: 0;
          font-size: 1.5rem;
          line-height: 0;
        }
      }
    }
    .other-details {
      border: 1px solid black;
      width: 80%;
      margin: auto;
      padding: 1rem;
    }
  }
</style>
