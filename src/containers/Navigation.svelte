<script>
  import { isMobile } from 'mobile-device-detect';
  import Links from '../components/Links.svelte';
  import { slide } from 'svelte/transition';
  import activeLink from '../store/RouterStore';
  let showDrawer = false;

  activeLink.subscribe(l => {
    showDrawer = false;
  });

  const toggleDrawer = () => {
    showDrawer = !showDrawer;
  };
</script>

<!-- html -->

<div class="navbar">
  {#if isMobile}
    <div class="bar-icon" on:click={toggleDrawer}>
      <div />
      <div />
      <div />
    </div>
    <div style="flex: 1;" />
    <img src="/favicon.png" alt="logo" />
  {:else}
    <img src="/favicon.png" alt="logo" />
    <Links />
  {/if}
</div>
{#if showDrawer}
  <div class="drawer" in:slide>
    <Links {isMobile} />
  </div>
{/if}

<!-- /html -->
<style lang="scss">
  .navbar {
    background-color: var(--theme-color);
    height: 3rem;
    display: flex;
    padding: 0.5rem 2rem;
    align-items: center;
    img {
      max-height: 100%;
    }
    .bar-icon {
      display: flex;
      flex-direction: column;
      div {
        width: 40px;
        height: 5px;
        background-color: var(--theme-color-extra-light);
        margin: 3px 0;
        border-radius: 2px;
      }
    }
  }
  .drawer {
    background-color: var(--theme-color);
    display: flex;
    flex-direction: column;
    border-top: 1px solid white;
  }
</style>
