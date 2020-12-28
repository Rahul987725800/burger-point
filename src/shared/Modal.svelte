<script>
  // import { afterUpdate } from 'svelte';
  // afterUpdate(() => {
  //   console.log('modal updated');
  // });
</script>

<!-- html -->
<div class="modal">
  <div class="background" on:click />
  <div class="content">
    <slot />
  </div>
</div>

<!-- /html -->
<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .background {
    background-color: rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
