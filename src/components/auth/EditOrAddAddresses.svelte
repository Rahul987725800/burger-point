<script>
  import Button from '../../shared/Button.svelte';
  import AddressStore, {
    getFetchedAddressesForMatchedAddress,
    makeAddressDefault,
  } from '../../store/AddressStore';
  import AuthStore from '../../store/AuthStore';
  import Loader from '../../shared/Loader.svelte';

  import AddressInput from './AddressInput.svelte';
  import AddressPreview from './AddressPreview.svelte';
  import { buttonClasses } from '../../utils';
  export let isForOrderConfirmation = false;
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
  let showAllAddr = false;
  const updateAddressServer = index => {
    loading = true;
    loadingMessage = 'Updating Address';
    makeAddressDefault(index);
    AuthStore.updateUser({
      addresses: $AddressStore.matchedAddress,
    }).then(() => {
      // console.log('updated address server');
      showAllAddr = false;
      loading = false;
      loadingMessage = '';
    });
  };
  let makeAddressDefaultClickHandler = index => {
    if (isForOrderConfirmation) {
      updateAddressServer(index);
      return;
    }
    let currentDefaultIndex = makeAddressDefault(index);
    if (userAddresses[currentDefaultIndex])
      userAddresses[currentDefaultIndex].isDefault = false;
    userAddresses[index].isDefault = true;
    // note here sequence is very important
    // because when adding new address ui and store refer to same objects
  };
  let loading = false;
  let loadingMessage = '';
  let error = false;
</script>

<!-- html -->
{#if loading}
  <Loader {loadingMessage} isFixedAtCenter={true} {error} />
{/if}
{#each userAddresses as address, index (index)}
  {#if !isForOrderConfirmation || showAllAddr || address.isDefault}
    <div>
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
                state.matchedAddress[index] = {
                  ...address,
                  ...additionalProps,
                };
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
              if (
                $AddressStore.matchedAddress[index] &&
                $AddressStore.matchedAddress[index].isValid
              ) {
                if (isForOrderConfirmation) {
                  updateAddressServer(index);
                } else {
                  if (setAsDefault) {
                    let currentDefaultIndex = makeAddressDefault(index);
                    userAddresses[currentDefaultIndex].isDefault = false;
                    setAsDefault = false;
                  }
                  address = {
                    ...$AddressStore.matchedAddress[index],
                    ...additionalProps,
                  };
                }
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
              if (userAddresses[index].isDefault) {
                alert("Can't delete default address");
                return;
              }
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
              on:click={() => {
                makeAddressDefaultClickHandler(index);
              }}
            >
              {#if isForOrderConfirmation}
                Deliver to this address
              {:else}
                Make this your default address
              {/if}
            </Button>
          {/if}
        </AddressPreview>
      {/if}
    </div>
  {/if}
{:else}
  {#if isForOrderConfirmation}
    <p>Please Enter Delivery Address:</p>
  {:else}
    <p>No saved addresses</p>
  {/if}
{/each}
{#if isForOrderConfirmation && !showAllAddr}
  <p>
    <Button
      on:click={() => {
        showAllAddr = true;
      }}>Use Another Address</Button
    >
  </p>
{/if}

{#if !isForOrderConfirmation || (isForOrderConfirmation && showAllAddr)}
  <p>
    <Button
      on:click={() => {
        showAddAddressBlock = true;
      }}
    >
      Add new
    </Button>
  </p>
{/if}
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
        if (
          $AddressStore.matchedAddress[index] &&
          $AddressStore.matchedAddress[index].isValid
        ) {
          if (isForOrderConfirmation) {
            updateAddressServer(index);
          } else {
            if (setAsDefault) {
              let currentDefaultIndex = makeAddressDefault(index);
              userAddresses[currentDefaultIndex].isDefault = false;
            }
            userAddresses.push($AddressStore.matchedAddress[index]);
            userAddresses = userAddresses;
          }
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
