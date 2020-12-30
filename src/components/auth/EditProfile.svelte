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

  let user;
  const unsubscribe = AuthStore.subscribe(state => {
    user = state.user;
    if (!user.addresses) {
      user.addresses = [];
    }
  });
  let initialPhones;
  if (user) {
    // console.log('address state updated');

    initialPhones = [...user.phones];

    AddressStore.update(state => {
      state.matchedAddress = [...user.addresses];
      // passing distributed values ensures array in store and user.addresses are different
      // console.log(state);
      return state;
    });
  }
  onDestroy(unsubscribe);
  let editPhoneNumbers = false;
  const savePhoneNumbersEditing = e => {
    // console.log(e.detail);
    // console.log(user.phones);
    // console.log(user.addresses);
    editPhoneNumbers = false;
    let i = 1;
    for (let phone of e.detail) {
      if (phone.isDefault) {
        user.phones[0] = phone.number;
      } else {
        user.phones[i++] = phone.number;
      }
    }
    // console.log(user.phones);
  };
  let loading = false;
  let loadingMessage = '';
  let error = false;
</script>

<!-- html -->
{#if loading}
  <Loader {loadingMessage} isFixedAtCenter={true} {error} />
{/if}
{#if user}
  <div class="container">
    <h2>Phone Numbers:</h2>
    {#if !editPhoneNumbers}
      <Card>
        <div class="phone-numbers-preview">
          <p id="edit-icon">
            <i
              on:click={() => {
                editPhoneNumbers = true;
              }}
              class="fa fa-edit"
            />
          </p>
          <p>Phone numbers saved:</p>
          <ul>
            {#each user.phones as phone, i (i)}
              <li>
                {phone}
                {#if i === 0}<span id="fav-icon">&#9733;</span>{/if}
              </li>
            {/each}
          </ul>
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
    <h2>Saved Addresses:</h2>
    <EditOrAddAddresses userAddresses={user.addresses} />
    <div class="edit-final-buttons">
      <Button
        type={buttonClasses.danger}
        on:click={() => {
          user.phones = initialPhones;
          // console.log(user.addresses);
          // console.log($AddressStore.matchedAddress);
          resetAddressState();
          activeLink.set(links.userProfile);
        }}
      >
        Discard Changes
      </Button>
      <Button
        type={buttonClasses.success}
        on:click={() => {
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
          loadingMessage = 'Updating user profile';
          // console.log('before update', $AuthStore.user);
          AuthStore.updateUser({
            phones: user.phones,
            addresses: $AddressStore.matchedAddress,
          })
            .then(() => {
              resetAddressState();
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
        }}
      >
        Save All Changes
      </Button>
    </div>
  </div>
{/if}

<!-- /html -->
<style lang="scss">
  $theme-red: #d91b42;
  .container {
    width: 50%;
    margin: 0 auto;
    @media (max-width: 900px) {
      width: 90%;
    }
    .phone-numbers-preview {
      padding: 1rem;
      position: relative;
      #edit-icon {
        position: absolute;
        right: 1.3rem;
        top: -0.5rem;
        font-size: 1.5rem;
        :hover {
          color: $theme-red;
          cursor: pointer;
        }
      }
      #fav-icon {
        color: $theme-red;
        position: relative;
        top: -5px;
        left: -2px;
      }
    }
    .edit-final-buttons {
      padding-top: 2rem;
      display: flex;
      justify-content: space-evenly;
    }
  }
</style>
