<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let type = 'danger';
</script>

<!-- html -->
<div class="block {type}">
  <div class="cross" on:click={() => dispatch('close')}>&#10005;</div>
  <slot />
</div>

<!-- /html -->
<style>
  .block {
    width: 50%;
    margin: 1rem auto;
    border: 1px solid;
    border-radius: 5px;
    position: relative;
    padding: 1.7rem;
  }
  .danger {
    color: rgb(105, 0, 0);
    background-color: rgba(201, 131, 131, 0.384);
    border-color: rgba(180, 0, 0, 0.603);
  }
  .success {
    color: rgb(37, 77, 0);
    background-color: rgba(42, 158, 87, 0.253);
    border-color: rgb(99, 204, 0);
  }
  .cross {
    position: absolute;
    right: 0.8rem;
    top: 0.2rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .danger .cross:hover {
    color: rgb(187, 131, 131);
  }
  .success .cross:hover {
    color: rgb(113, 151, 78);
  }
</style>
