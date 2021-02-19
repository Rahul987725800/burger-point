<script>
  import AuthStore from '../store/AuthStore';
  import OrdersStore from '../store/OrdersStore';
  import BurgerStore from '../store/BurgerStore';
  import activeLink from '../store/RouterStore';
  import { links } from '../utils';
  import Loader from '../shared/Loader.svelte';
  import Burger from '../components/burger/Burger.svelte';
  import Button from '../shared/Button.svelte';
  import EditProfile from '../components/auth/EditProfile.svelte';
  import EditContainer from '../shared/EditContainer.svelte';

  let loading = false;
  let loadingMessage = '';
  let error = false;
  let deliverTypes = ['normal', 'priority', 'express'];
  let deliveryMethod = 'normal';

  const confirmOrderHandler = () => {
    loading = true;
    error = false;
    loadingMessage = 'Placing your order...';
    OrdersStore.sendOrder($AuthStore.token, $AuthStore.userId, {
      ingredients: $BurgerStore.ingredients,
      delivery: deliveryMethod,
      time: new Date(),
      phone: $AuthStore.user.phones[0],
      address: $AuthStore.user.addresses.filter(
        addr => addr.isDefault === true
      )[0],
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
<div class="container">
  <h2>Here's your delicious burger!</h2>
  <div class="burger"><Burger /></div>
  <div class="edit">
    <EditProfile isForOrderConfirmation={true} />
  </div>
  <EditContainer>
    <p>Delivery Method:</p>
    <select bind:value={deliveryMethod}>
      {#each deliverTypes as dm (dm)}
        <option value={dm}>{dm.toLocaleUpperCase()}</option>
      {/each}
    </select>
  </EditContainer>
  <Button on:click={confirmOrderHandler} type="success">Confirm Order</Button>
</div>

<!-- /html -->
<style lang="scss">
  .container {
    text-align: center;
  }

  .burger {
    width: 30%;
    margin: 1rem auto;
  }
  .edit {
    text-align: left;
  }

  @media (max-width: 900px) {
    .burger {
      width: 60%;
    }
  }
</style>
