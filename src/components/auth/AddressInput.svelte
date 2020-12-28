<script>
  import AddressStore from '../../store/AddressStore';
  import Input from './Input.svelte';
  import { validAddress, validPinCode } from './inputValidators.js';
  export let index;
  export let validateAddressFields;

  $: if (validateAddressFields) {
    // console.log('validation called');
    validateAddress();
    validatePincode();
    addressCommonProps.showErrorMessage = true;
    fields.pincode.showErrorMessage = true;
  }

  let addressCommonProps = {
    type: 'text',
    error: '',
    errmsg: "Address can't be completely empty, fill at least one line",
    isValid: false,
    showErrorMessage: false,
    validator: () =>
      validAddress(
        {
          address1: fields.address1.value,
          address2: fields.address2.value,
        },
        index
      ),
  };

  let fields = {
    address1: {
      label: 'Address line 1 :',
      id: 'address-line1-' + index,
      value: '',
    },
    address2: {
      label: 'Address line 2 :',
      id: 'address-line2-' + index,
      value: '',
    },
    pincode: {
      label: 'Pin Code :',
      id: 'pin-code',
      type: 'number',
      value: '',
      error: '',
      errmsg: 'Please enter a valid pin code',
      validator: async () => {
        let address = {
          address1: fields.address1.value,
          address2: fields.address2.value,
        };
        const result = await validPinCode(fields.pincode.value, address, index);
        if ((address.address1 + address.address2).trim().length === 0) {
          // when we autofill address by entering pin first
          // address is filled simultaneously as pincode
          // but address1 and address2 are not yet assigned their value
          // so we run the validator again
          // to update address.isValid
          addressCommonProps.validator();
        }
        // console.log(result);
        return result;
      },
      isValid: false,
      showErrorMessage: false,
    },
  };
  const validateAddress = () => {
    addressCommonProps.isValid = addressCommonProps.validator();
    if (!addressCommonProps.isValid) {
      addressCommonProps.error = addressCommonProps.errmsg;
    } else {
      addressCommonProps.error = '';
    }
  };
  const validatePincode = async () => {
    fields.pincode.isValid = await fields.pincode.validator();
    if (!fields.pincode.isValid) {
      fields.pincode.error = fields.pincode.errmsg;
    } else {
      fields.pincode.error = '';
    }
  };
</script>

<!-- html -->

<Input
  label={fields.address1.label}
  id={fields.address1.id}
  value={fields.address1.value}
  type={addressCommonProps.type}
  inputHandler={value => {
    fields.address1.value = value;
    validateAddress();
  }}
  errorMessage={addressCommonProps.showErrorMessage ? addressCommonProps.error : ''}
  changeHandler={value => {
    addressCommonProps.showErrorMessage = true;
  }}
/>
<Input
  label={fields.address2.label}
  id={fields.address2.id}
  value={fields.address2.value}
  type={addressCommonProps.type}
  inputHandler={value => {
    fields.address2.value = value;
    validateAddress();
  }}
  errorMessage={addressCommonProps.showErrorMessage ? addressCommonProps.error : ''}
  changeHandler={value => {
    addressCommonProps.showErrorMessage = true;
  }}
/>

<Input
  label={fields.pincode.label}
  id={fields.pincode.id}
  type={fields.pincode.type}
  value={fields.pincode.value}
  inputHandler={value => {
    fields.pincode.value = value;
    validatePincode();
  }}
  errorMessage={fields.pincode.showErrorMessage ? fields.pincode.error : ''}
  changeHandler={value => {
    fields.pincode.showErrorMessage = true;
  }}
/>

<div class="form-field">
  <label for={'address-dropdown' + index}>Select Address :</label>
  <!-- svelte-ignore a11y-autofocus -->
  {#if $AddressStore.matchedAddress[index]}
    <select
      bind:value={$AddressStore.matchedAddress[index]}
      on:blur={() => {
        $AddressStore.matchedAddress[index].isManuallySelected = true;
        // console.log($AddressStore.matchedAddress[index]);
      }}
      id={'address-dropdown' + index}
      class="address-dropdown"
    >
      {#each $AddressStore.fetchedAddresses[index] as address}
        <option value={address}>
          {address.Name},
          {address.District},
          {address.Division},
          {address.Region},
          {address.Circle}
        </option>
      {/each}
    </select>
  {:else}<span>Please enter Pin Code to select address.</span>{/if}
</div>

<!-- /html -->
<style lang="scss">
  .form-field {
    margin: 18px;
    text-align: left;
    .address-dropdown {
      width: 90%;
    }
  }
</style>
