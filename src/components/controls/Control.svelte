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
    <button on:click={add}>+</button>
    <button
      on:click={remove}
      class:disabled={$burgerStore.ingredients[type] === 0}
    >-</button>
  </div>
</div>

<!-- /html -->
<style lang="scss">
  .control {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-weight: bold;
    color: var(--theme-color-dark);
  }
  .name {
    text-transform: capitalize;
    flex: 1;
  }
  .count {
    flex: 1;
  }
  button {
    font-size: 1.3rem;
    margin: 0 0.5rem;
    border: none;
    line-height: 1;
    width: 3rem;
    border: 1px solid var(--theme-color);
    &:hover {
      color: black;
      cursor: pointer;
      background-color: var(--theme-color-extra-light);
      border-color: var(--theme-color-dark);
    }
    &.disabled {
      opacity: 0.5;
      &:hover {
        cursor: not-allowed;
        border: none;
      }
    }
  }
</style>
