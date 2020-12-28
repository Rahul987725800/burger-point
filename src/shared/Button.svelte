<script>
  export let type = 'primary';
  export let disabled = false;
</script>

<button class={type} on:click {disabled} class:disabled>
  <slot />
</button>

<style lang="scss">
  button {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    border-radius: 0.3rem;
    outline: none;
    border: none;
  }
  .primary {
    color: white;
    background-color: rgb(27, 97, 189);
  }
  .secondary {
    color: white;
    background-color: rgb(121, 121, 121);
  }
  .success {
    color: white;
    background-color: rgb(51, 122, 18);
  }
  .danger {
    color: white;
    background-color: rgb(194, 44, 24);
  }
  .warning {
    color: black;
    background-color: rgb(255, 215, 86);
  }
  .info {
    color: black;
    background-color: rgb(65, 196, 189);
  }
  .light {
    color: black;
    background-color: rgb(241, 241, 241);
  }
  .dark {
    color: white;
    background-color: rgb(29, 29, 29);
  }
  .link {
    color: rgb(98, 171, 219);
    text-decoration: underline;
    background-color: white;
  }
  .disabled {
    opacity: 0.7;
    &:hover {
      cursor: not-allowed;
    }
  }
</style>
