<script>
  import { onMount } from 'svelte';
  import AddressStore from '../../store/AddressStore';
  export let autofocus = false;
  export let label;
  export let id;
  export let type;
  export let inputHandler;
  export let errorMessage;
  export let value;
  export let placeholder = '';
  export let changeHandler = value => {};

  let finalType = type;
  if (type === 'password') {
    finalType = 'text';
    setTimeout(() => {
      finalType = 'password';
    }, 1);
  }
  let myInput;
  onMount(() => {
    if (autofocus) {
      myInput.focus();
    }
  });
  const togglePassword = () => {
    if (finalType === 'text') {
      finalType = 'password';
    } else {
      finalType = 'text';
    }
  };
</script>

<!-- html -->
<div class="form-field">
  <label for={id}>{label}</label>
  <!-- svelte-ignore a11y-autofocus -->
  {#if id === 'address-dropdown'}
    <select
      bind:value={$AddressStore.matchedAddress}
      on:blur={() => {
        console.log($AddressStore.matchedAddress);
      }}
      {id}
    >
      {#each $AddressStore.fetchedAddresses as address}
        <option value={address}>{address.Name}</option>
      {/each}
    </select>
  {:else}
    {#if id === 'phone'}<span class="phone-prefix">+91</span>{/if}
    <input
      bind:this={myInput}
      autocomplete="on"
      type={finalType}
      {id}
      {value}
      on:input={e => inputHandler(e.target.value)}
      {placeholder}
      on:change={e => changeHandler(e.target.value)}
    />
    {#if type === 'password'}
      <i
        class="password-icon fa {finalType === 'password' ? 'fa-eye' : 'fa-eye-slash'}"
        aria-hidden="true"
        on:click={togglePassword}
      />
    {/if}
    <div class="error">{errorMessage}</div>
  {/if}
</div>

<!-- /html -->
<style lang="scss">
  .form-field {
    margin: 18px;
    text-align: left;
    position: relative;
    input {
      width: 90%;
      border: none;
      border-bottom: 1px solid var(--theme-color);
      outline: none;
      &:focus {
        border-bottom: 2px solid var(--theme-color);
      }
    }
    .phone-prefix {
      position: absolute;
      left: -27px;
      top: 37px;
      @media (max-width: 600px) {
        top: 35px;
      }
    }
    .password-icon {
      cursor: pointer;
    }

    label {
      margin: 10px auto;
      text-align: left;
    }
    .error {
      font-weight: bold;
      font-size: 12px;
      color: #d91b42;
    }
    #address-dropdown {
      width: 90%;
    }
  }
</style>
