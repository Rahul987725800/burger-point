<script>
  import burgerStore from '../../store/BurgerStore';
  export let type;

  let add = () => {
    burgerStore.addIngredient(type);
  };
  let remove = () => {
    burgerStore.removeIngredient(type);
  };
</script>

<!-- html -->
<div class="control">
  <div class="name">{type}</div>
  <div class="count">{$burgerStore.ingredients[type]}</div>

  <div class="buttons">
    <button
      on:click={remove}
      class:disabled={$burgerStore.ingredients[type] === 0}>Less</button
    >
    <button on:click={add}>More</button>
  </div>
</div>

<!-- /html -->
<style lang="scss">
  .control {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-weight: bold;
  }
  .name {
    text-transform: capitalize;
    flex: 2;
    font-style: italic;
  }
  .count {
    flex: 1;
  }
  .buttons {
    flex: 2;
    @media (max-width: 1000px) {
      flex: 4;
    }
    button {
      margin: 0 0.5rem;

      border: none;
      line-height: 1;
      width: 4rem;
      @media (max-width: 600px) {
        width: 3rem;
        margin: 0 0.3rem;
      }
      background-color: var(--theme-color-extra-light);
      border: 1px solid white;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        border-color: var(--theme-color);
      }
      &.disabled {
        opacity: 0.5;

        cursor: not-allowed;
      }
    }
  }
</style>
