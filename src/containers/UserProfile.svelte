<script>
  import { onDestroy } from 'svelte';
  import Button from '../shared/Button.svelte';
  import Card from '../shared/Card.svelte';

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
<div class="container">
  <Card
    ><div class="contents">
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  </Card>
  <div style="text-align: center;">
    <Button
      on:click={() => {
        activeLink.set(links.editProfile);
      }}>Edit Profile</Button
    >
  </div>
</div>

<!-- /html -->
<style>
  .container {
    width: 80%;
    margin: auto;
  }
  .contents {
    padding: 2rem;
    margin: 1rem;
  }
</style>
