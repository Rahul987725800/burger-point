<script>
  import BurgerBuilder from './containers/BurgerBuilder.svelte';

  import { links } from './utils';
  import activeLink from './store/RouterStore';
  import Orders from './containers/Orders.svelte';
  import Auth from './containers/Auth.svelte';
  import BurgerStore from './store/BurgerStore.js';
  import SingleOrder from './containers/SingleOrder.svelte';
  import { onMount } from 'svelte';
  import AuthStore from './store/AuthStore';
  import Loader from './shared/Loader.svelte';
  import UserProfile from './containers/UserProfile.svelte';
  import Navigation from './containers/Navigation.svelte';
  import OrderConfirmation from './containers/OrderConfirmation.svelte';
  import EditProfile from './containers/EditProfile.svelte';
  let loading = true;
  let loadingMessage = '';
  onMount(async () => {
    loading = true;
    loadingMessage = 'Checking user...';
    await AuthStore.authCheckState();
    loadingMessage = 'Initializing burger...';
    await BurgerStore.setIngredients();
    loading = false;
  });

  let aLink;
  activeLink.subscribe(l => {
    aLink = l;
  });
</script>

<!-- html -->
<main>
  <Navigation />
  {#if loading}
    <Loader {loadingMessage} />
  {:else if aLink === links.home}
    <BurgerBuilder />
  {:else if aLink === links.orders}
    <Orders />
  {:else if aLink === links.auth}
    <Auth />
  {:else if aLink === links.order}
    <SingleOrder />
  {:else if aLink === links.userProfile}
    <UserProfile />
  {:else if aLink === links.editProfile}
    <EditProfile />
  {:else if aLink === links.orderConfirmation}
    <OrderConfirmation />
  {/if}
</main>

<!-- /html -->
<style>
</style>
