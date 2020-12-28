<script>
  import { onDestroy } from 'svelte';

  import AuthStore from '../store/AuthStore';
  import activeLink from '../store/RouterStore';
  import { links } from '../utils';
  let user;
  const unsubscribe = AuthStore.subscribe(state => {
    user = state.user;
    // console.log(user);
  });
  onDestroy(unsubscribe);
</script>

<!-- html -->
<p>profile</p>
<p>{user.username}</p>
<p>{user.email}</p>
<button
  on:click={() => {
    activeLink.set(links.editProfile);
  }}
>Edit Profile</button>

<!-- /html -->
<style>
</style>
