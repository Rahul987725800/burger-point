<script>
  import activeLink from '../store/RouterStore.js';
  import { links } from '../utils.js';
  import AuthStore from '../store/AuthStore.js';
  export let isMobile = false;
</script>

<!-- html -->

<button
  class:isMobile
  on:click={() => activeLink.set(links.home)}
  class={$activeLink === links.home && 'active'}>Home</button
>

{#if !$AuthStore.token}
  <button
    class:isMobile
    on:click={() => activeLink.set(links.auth)}
    class={$activeLink === links.auth && 'active'}>Login</button
  >
{:else}
  <button
    class:isMobile
    on:click={() => activeLink.set(links.orders)}
    class={$activeLink === links.orders && 'active'}>Orders</button
  >
  <button
    class:isMobile
    on:click={() => {
      AuthStore.logout();
      activeLink.set(links.home);
    }}>Logout</button
  >
  {#if !isMobile}
    <div style="flex: 1;" />
  {/if}
  <button
    class:isMobile
    on:click={() => activeLink.set(links.userProfile)}
    class={($activeLink === links.userProfile ||
      $activeLink === links.editProfile) &&
      'active'}
  >
    {$AuthStore.user.username}
  </button>
{/if}

<!-- /html -->
<style lang="scss">
  button {
    height: 100%;
    background-color: transparent;
    margin: 0 0.5rem;
    border: none;
    color: #7e878b;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    padding: 1rem;
    &:active {
      background-color: transparent;
    }
    &:hover {
      color: #e4e4e4;
      background-color: rgba(157, 199, 238, 0.103);
    }
    &.active {
      color: #e4e4e4;
    }
    &.isMobile {
      max-height: 6rem;
      width: 60%;
      font-size: 1.5rem;
      flex: 1;
      color: #7e878b;
      border-bottom: 0.2px solid white;
      border-top: 0.2px solid white;
      &.active {
        color: #e4e4e4;
      }
    }
  }
</style>
