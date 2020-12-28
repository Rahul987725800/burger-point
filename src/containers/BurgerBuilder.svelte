<script>
  import BuildControls from '../components/controls/BuildControls.svelte';
  import Burger from '../components/burger/Burger.svelte';
</script>

<!-- html -->
<div class="container">
  <div class="burger">
    <Burger />
  </div>
  <div class="controls">
    <BuildControls />
  </div>
</div>

<!-- /html -->
<style>
  .container {
    margin: auto;
  }
  .burger {
    width: 30%;
    margin: 1rem auto;
  }
  @media (max-width: 900px) {
    .burger {
      width: 60%;
    }
  }
  .controls {
    background-color: var(--theme-color-light);
  }
</style>
