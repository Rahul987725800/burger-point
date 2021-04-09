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
  .controls {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 900px) {
    .burger {
      width: 70%;
    }
    .controls {
      width: 80%;
    }
  }
  .controls,
  .controls {
    background-color: var(--theme-color-light);
    border-radius: 1rem;
  }
</style>
