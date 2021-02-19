<script>
  import { onDestroy } from 'svelte';

  import AuthStore from '../../store/AuthStore';

  import AddressStore, { resetAddressState } from '../../store/AddressStore';
  import EditOrAddAddresses from './EditOrAddAddresses.svelte';
  import EditPhones from './EditPhones.svelte';
  import Card from '../../shared/Card.svelte';
  import Button from '../../shared/Button.svelte';
  import { buttonClasses, links } from '../../utils';

  import activeLink from '../../store/RouterStore';
  import Loader from '../../shared/Loader.svelte';
  import { validPhoneNumber } from './inputValidators';
  import EditContainer from '../../shared/EditContainer.svelte';

  export let isForOrderConfirmation = false;

  let user;
  const unsubscribe = AuthStore.subscribe(state => {
    user = { ...state.user };
    user.phones = [...user.phones];

    // user = {...state.user};
    if (!user.addresses) {
      user.addresses = [];
    } else {
      user.addresses = [...user.addresses];
    }
  });
  let initialPhones;
  if (user) {
    // console.log('address state updated');

    initialPhones = [...user.phones];

    AddressStore.update(state => {
      // console.log(state.matchedAddress);
      state.matchedAddress = [...user.addresses];
      // passing distributed values ensures array in store and user.addresses are different
      // console.log(state);
      return state;
    });
  }
  let manualExit = false;
  onDestroy(() => {
    unsubscribe();
    // user.username = 'ghanta';
    // user.addresses.push(342432);
    // console.log($AuthStore.user);
    // console.log(user);
    // console.log('user trying to move to another page');
    if (!manualExit && !isForOrderConfirmation) {
      let res = confirm('Save Changes!');
      // console.log(res);
      if (res) {
        saveEditingHandler();
        resetAddressState();
      } else {
        discardChangesHandler();
      }
    }
  });

  let editPhoneNumbers = false;
  const savePhoneNumbersEditing = e => {
    // console.log(e.detail);
    // console.log(user.phones);
    // console.log(user.addresses);
    editPhoneNumbers = false;
    let i = 1;
    let updatedPhones = [];
    if (isForOrderConfirmation && e.detail.length > user.phones.length) {
      e.detail[0].isDefault = false;
      e.detail[e.detail.length - 1].isDefault = true;
    }
    for (let phone of e.detail) {
      if (phone.isDefault) {
        updatedPhones[0] = phone.number;
      } else {
        updatedPhones[i++] = phone.number;
      }
    }

    user.phones = updatedPhones;
    if (isForOrderConfirmation) updatePhoneServer();
  };
  let useAnotherNum = false;
  const updatePhoneServer = () => {
    loading = true;
    loadingMessage = 'Updating Phone Number';
    AuthStore.updateUser({
      phones: user.phones,
    }).then(() => {
      // console.log('updated phone server');
      useAnotherNum = false;
      loading = false;
      loadingMessage = '';
    });
  };
  let loading = false;
  let loadingMessage = '';
  let error = false;

  const discardChangesHandler = () => {
    user.phones = initialPhones;
    // console.log(user.addresses);
    // console.log($AddressStore.matchedAddress);
    resetAddressState();
    manualExit = true;
    activeLink.set(links.userProfile);
  };
  const saveEditingHandler = () => {
    let allAddressesValid = true;
    for (let addr of $AddressStore.matchedAddress) {
      if (addr) {
        allAddressesValid = allAddressesValid && addr.isValid;
      }
    }
    if (editPhoneNumbers || !allAddressesValid) {
      alert('Finish editing first');
      return;
    }
    loading = true;
    loadingMessage = 'Updating User Profile';
    // console.log('before update', $AuthStore.user);
    AuthStore.updateUser({
      phones: user.phones,
      addresses: $AddressStore.matchedAddress,
    })
      .then(() => {
        resetAddressState();
        manualExit = true;
        activeLink.set(links.userProfile);
        loading = false;
      })
      .catch(err => {
        loadingMessage = 'Error occurred while updating profile';
        error = true;
        setTimeout(() => {
          loading = false;
          error = false;
          loadingMessage = '';
        }, 1000);
      });
  };
  let newNumber = null;
</script>

<!-- html -->
{#if loading}
  <Loader {loadingMessage} isFixedAtCenter={true} {error} />
{/if}
{#if user}
  <EditContainer>
    {#if !isForOrderConfirmation || useAnotherNum}
      <h2>Phone Numbers:</h2>
      {#if !editPhoneNumbers}
        <Card>
          <div class="phone-numbers-preview">
            <p
              id="edit-icon"
              on:click={() => {
                editPhoneNumbers = true;
              }}
            >
              <i class="fa fa-edit" />
              Edit/Add
            </p>
            <p>Check mark to set default phone number</p>
            <p>Phone numbers saved:</p>
            <ul class="phone-list">
              {#each user.phones as phone, i (i)}
                <li>
                  {phone}&nbsp;&nbsp;&nbsp;
                  <input
                    type="checkbox"
                    checked={i === 0}
                    on:input={e => {
                      if (e.target.checked && i !== 0) {
                        let temp = user.phones[i];
                        user.phones[i] = user.phones[0];
                        user.phones[0] = temp;
                        e.target.checked = false;
                        if (isForOrderConfirmation) updatePhoneServer();
                      }
                    }}
                  />
                </li>
              {/each}
            </ul>
            {#if isForOrderConfirmation}
              <p>
                Another Number : <input
                  type="text"
                  bind:value={newNumber}
                  on:change={e => {
                    if (!validPhoneNumber(e.target.value)) {
                      alert('Please enter a valid Phone Number');
                    } else {
                      user.phones.unshift(newNumber);
                      updatePhoneServer();
                      newNumber = null;
                    }
                  }}
                />
              </p>
            {/if}
          </div>
        </Card>
      {:else}
        <EditPhones
          userPhones={user.phones}
          on:cancelEdit={() => {
            editPhoneNumbers = false;
          }}
          on:saveEdit={savePhoneNumbersEditing}
        />
      {/if}
    {:else}
      <h2>Phone Number: {user.phones[0]}</h2>
      <Button
        on:click={() => {
          useAnotherNum = true;
        }}>Use Another Number</Button
      >
    {/if}

    {#if isForOrderConfirmation}
      <h2>Delivery Address:</h2>
    {:else}
      <h2>Saved Addresses:</h2>
    {/if}
    <EditOrAddAddresses
      userAddresses={user.addresses}
      {isForOrderConfirmation}
    />
    {#if !isForOrderConfirmation}
      <div class="edit-final-buttons">
        <Button type={buttonClasses.danger} on:click={discardChangesHandler}>
          Discard Changes
        </Button>
        <Button type={buttonClasses.success} on:click={saveEditingHandler}>
          Save All Changes
        </Button>
      </div>
    {/if}
  </EditContainer>
{/if}

<!-- /html -->
<style lang="scss">
  $theme-red: #d91b42;

  .phone-numbers-preview {
    padding: 1rem;
    position: relative;

    #edit-icon {
      position: absolute;
      right: 1.3rem;
      top: -0.5rem;
      i {
        font-size: 1.5rem;
      }

      &:hover {
        color: $theme-red;
        cursor: pointer;
      }
    }
    .phone-list {
      li {
        margin: 0.2rem;
      }
    }
  }
  .edit-final-buttons {
    padding-top: 2rem;
    display: flex;
    justify-content: space-evenly;
  }
</style>
