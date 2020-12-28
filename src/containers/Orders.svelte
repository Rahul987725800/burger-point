<script>
  import { isMobile } from 'mobile-device-detect';
  import OrdersStore from '../store/OrdersStore';

  import { onDestroy, onMount } from 'svelte';
  import OrdersDesktop from '../components/orders/OrdersDesktop.svelte';
  import OrdersMobile from '../components/orders/OrdersMobile.svelte';
  import AuthStore from '../store/AuthStore';
  import Loader from '../shared/Loader.svelte';

  let orders = [];

  const unsubscribe = OrdersStore.subscribe(state => {
    // console.log('orders updated in component');
    let fetchedOrders = [];
    for (let key in state.orders) {
      fetchedOrders.push({
        id: key,
        userId: state.orders[key].userId,
        ...state.orders[key].details,
        showDetails: false,
      });
    }
    orders = fetchedOrders;
  });
  onDestroy(unsubscribe);

  let loading = true;
  let loadingMessage = '';
  let error = false;
  let fetchOrders = () => {
    // console.log('fetching orders');
    // console.log($OrdersStore.orders);
    // here we are assuming that individual order can't be modified
    // so if number of fetched orders is same as orders in store
    // we don't update the state
    loadingMessage = 'Loading orders...';
    loading = true;
    const numOrdersInState = Object.keys($OrdersStore.orders).length;
    OrdersStore.getOrders($AuthStore.token, $AuthStore.userId)
      .then(orders => {
        const numFetchedOrders = Object.keys(orders).length;
        if (numFetchedOrders !== numOrdersInState) {
          // console.log('updating orders');
          OrdersStore.updateOrders(orders);
        }
        loading = false;
      })
      .catch(err => {
        // console.log(err);
        loadingMessage = 'Error occurred while fetching orders!!!';
        error = true;
        setTimeout(() => {
          loading = false;
        }, 2000);
      });
  };
  onMount(() => {
    fetchOrders();
  });
</script>

{#if loading}
  <Loader {loadingMessage} {error} />
{/if}
{#if orders.length > 0}
  {#if isMobile}
    <OrdersMobile {orders} />
  {:else}
    <OrdersDesktop {orders} />
  {/if}
{:else}
  <p>No order found</p>
{/if}
