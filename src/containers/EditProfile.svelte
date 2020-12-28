<script>
  import { onDestroy } from 'svelte';

  import AuthStore from '../store/AuthStore';
  let user;
  const unsubscribe = AuthStore.subscribe(state => {
    user = state.user;
    // console.log(user);
  });
  onDestroy(unsubscribe);
</script>

<!-- html -->
<p>edit profile</p>

<!-- /html -->
<style>
</style>
