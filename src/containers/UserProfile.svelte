<script>
  import { onDestroy } from 'svelte';
  import Button from '../shared/Button.svelte';
  import Card from '../shared/Card.svelte';
  import SimpleLink from '../shared/SimpleLink.svelte';

  import AuthStore from '../store/AuthStore';
  import activeLink from '../store/RouterStore';
  import { links } from '../utils';
  let user;
  const unsubscribe = AuthStore.subscribe(state => {
    user = state.user;
    // console.log(user);
  });
  console.log(user);
  onDestroy(unsubscribe);
  let displayedPhones = user.phones.slice(0, Math.min(5, user.phones.length));
</script>

<!-- html -->
<div class="container">
  <Card
    ><div class="contents">
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <div>
        Phone Numbers:

        <ul>
          {#each displayedPhones as phone, i (i)}
            <li>{phone}</li>
          {/each}
          {#if user.phones.length > 5 && displayedPhones.length < user.phones.length}
            <SimpleLink
              on:click={() => {
                displayedPhones = [...user.phones];
              }}
            >
              More...
            </SimpleLink>
          {/if}
        </ul>
      </div>
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
