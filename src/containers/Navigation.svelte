<script>
  import { isMobile } from 'mobile-device-detect';
  import Links from '../components/Links.svelte';
  import activeLink from '../store/RouterStore';
  import { links } from '../utils';
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
    <img
      src="/favicon.png"
      alt="logo"
      on:click={() => activeLink.set(links.home)}
    />
  {:else}
    <img
      src="/favicon.png"
      alt="logo"
      on:click={() => activeLink.set(links.home)}
    />
    <Links />
  {/if}
</div>
{#if showDrawer}
  <div class="drawer">
    <p><span on:click={toggleDrawer}>&#10005;</span></p>
    <Links {isMobile} />
    <p />
    <p />
  </div>
{/if}

<!-- /html -->
<style lang="scss">
  .navbar {
    background-color: #0e1e25;
    height: 3rem;
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    img {
      max-height: 100%;
      margin-right: 1rem;
    }
    .bar-icon {
      display: flex;
      flex-direction: column;
      div {
        width: 40px;
        height: 5px;
        background-color: white;
        margin: 3px 0;
        border-radius: 2px;
      }
    }
  }
  .drawer {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100vw;
    background-color: #0e1e25;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    p {
      padding-left: 4rem;
      padding-top: 1rem;
      text-align: left;
      width: 100%;
      span {
        color: white;
        font-size: 1.5rem;
      }
    }
  }
</style>
