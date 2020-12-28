<script>
  import Modal from '../../shared/Modal.svelte';
  import Button from '../../shared/Button.svelte';
  import { buttonClasses } from '../../utils';
  export let close;
  export let ingredients;
  export let orderContinueHandler;
</script>

<Modal on:click={close}>
  <div class="block">
    <p>Here is your Order</p>
    <ul>
      {#each Object.keys(ingredients) as ing, i (i)}
        <li><span>{ing}</span> <span>{ingredients[ing]}</span></li>
      {/each}
    </ul>
    <div class="buttons">
      <Button type={buttonClasses.danger} on:click={close}>CANCEL</Button>
      <Button type={buttonClasses.success} on:click={orderContinueHandler}>
        SUCCESS
      </Button>
    </div>
  </div>
</Modal>

<style lang="scss">
  .block {
    padding: 0.5rem 2rem;
    min-width: 20vw;
    min-height: 30vh;
    background-color: white;
    border-radius: 5px;
    @media (max-width: 900px) {
      min-width: 60vw;
    }
    ul {
      padding: 0;
      list-style: none;
      text-align: left;
      li {
        text-transform: capitalize;
        display: flex;
        justify-content: space-between;
        width: 50%;
        @media (max-width: 900px) {
          width: 80%;
        }
      }
    }

    .buttons {
      text-align: right;
      transform: scale(0.8) translateX(2rem);
    }
  }
</style>
