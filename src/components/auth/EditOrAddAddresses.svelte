<script>
  import Button from '../../shared/Button.svelte';
  import AddressStore, {
    getFetchedAddressesForMatchedAddress,
    makeAddressDefault,
  } from '../../store/AddressStore';

  import AddressInput from './AddressInput.svelte';
  import AddressPreview from './AddressPreview.svelte';
  import { buttonClasses } from '../../utils';

  export let userAddresses;
  let additionalProps = {
    editMode: null,
    runValidation: null,
  };
  userAddresses = userAddresses.map(address => {
    return {
      ...address,
      ...additionalProps,
    };
  });

  let showAddAddressBlock = false;
  let validateAddressFields = false;
  let setAsDefault = false;

  let makeAddressDefaultClickHandler = index => {
    let currentDefaultIndex = makeAddressDefault(index);
    if (userAddresses[currentDefaultIndex])
      userAddresses[currentDefaultIndex].isDefault = false;
    userAddresses[index].isDefault = true;
    // note here sequence is very important
    // because when adding new address ui and store refer to same objects
  };
</script>

<!-- html -->

{#each userAddresses as address, index (index)}
  {#if address.editMode}
    <AddressInput {index} validateAddressFields={address.runValidation} />
    <div class="controls">
      {#if !address.isDefault}
        <p class="default-checkbox">
          <input type="checkbox" bind:checked={setAsDefault} />
          Mark as default
        </p>
      {/if}
      <Button
        type={buttonClasses.danger}
        on:click={() => {
          AddressStore.update(state => {
            state.matchedAddress[index] = { ...address, ...additionalProps };
            // console.log(state.matchedAddress[index]);
            return state;
          });
          address.editMode = false;
        }}
      >
        Cancel
      </Button>
      <Button
        type={buttonClasses.success}
        on:click={() => {
          address.runValidation = true;
          // console.log($AddressStore.matchedAddress[index]);
          if ($AddressStore.matchedAddress[index] && $AddressStore.matchedAddress[index].isValid) {
            if (setAsDefault) {
              let currentDefaultIndex = makeAddressDefault(index);
              userAddresses[currentDefaultIndex].isDefault = false;
              setAsDefault = false;
            }
            address = { ...$AddressStore.matchedAddress[index], ...additionalProps };
          }
        }}
      >
        Save
      </Button>
    </div>
  {:else}
    <AddressPreview
      {address}
      defaultClickHandler={() => makeAddressDefaultClickHandler(index)}
    >
      <Button
        type={buttonClasses.light}
        on:click={() => {
          if (!$AddressStore.fetchedAddresses[index]) {
            getFetchedAddressesForMatchedAddress(address.Pincode, index);
          }
          address.editMode = true;
        }}
      >
        Edit
      </Button>
      <Button
        type={buttonClasses.light}
        on:click={() => {
          $AddressStore.matchedAddress.splice(index, 1);
          userAddresses.splice(index, 1);

          userAddresses = userAddresses;
          if (userAddresses.length === 1) {
            makeAddressDefaultClickHandler(0);
          }
        }}
      >
        Delete
      </Button>
      {#if !address.isDefault}
        <Button
          type={buttonClasses.light}
          on:click={() => makeAddressDefaultClickHandler(index)}
        >
          Make this your default address
        </Button>
      {/if}
    </AddressPreview>
  {/if}
{:else}
  <p>No saved addresses</p>
{/each}
<p>
  <Button
    on:click={() => {
      showAddAddressBlock = true;
    }}
  >
    Add new
  </Button>
</p>

{#if showAddAddressBlock}
  <AddressInput index={userAddresses.length} {validateAddressFields} />
  <div class="controls">
    <p class="default-checkbox">
      <input type="checkbox" bind:checked={setAsDefault} />
      Mark as default
    </p>
    <Button
      type={buttonClasses.danger}
      on:click={() => {
        showAddAddressBlock = false;
        validateAddressFields = false;
        $AddressStore.matchedAddress[userAddresses.length] = null;
        $AddressStore.fetchedAddresses[userAddresses.length] = null;
      }}
    >
      Cancel
    </Button>
    <Button
      type={buttonClasses.success}
      on:click={() => {
        validateAddressFields = true;
        let index = userAddresses.length;
        // console.log($AddressStore.matchedAddress[index]);
        if ($AddressStore.matchedAddress[index] && $AddressStore.matchedAddress[index].isValid) {
          if (setAsDefault) {
            let currentDefaultIndex = makeAddressDefault(index);
            userAddresses[currentDefaultIndex].isDefault = false;
          }
          userAddresses.push($AddressStore.matchedAddress[index]);
          userAddresses = userAddresses;

          showAddAddressBlock = false;
          validateAddressFields = false;
          setAsDefault = false;
        }
      }}
    >
      Save
    </Button>
  </div>
{/if}

<!-- /html -->
<style>
  .controls {
    padding-left: 1rem;
  }
</style>
