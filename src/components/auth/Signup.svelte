<script>
  import Input from './Input.svelte';
  import Button from '../../shared/Button.svelte';
  import AuthStore from '../../store/AuthStore';
  import AddressStore, { resetAddressState } from '../../store/AddressStore';
  import {
    validEmail,
    validPassword,
    validConfirmPassword,
    isNonEmpty,
    validPhoneNumber,
  } from './inputValidators.js';
  import AddressInput from './AddressInput.svelte';

  let fields = {
    username: {
      label: 'Username :',
      id: 'username',
      type: 'text',
      value: '',
      error: '',
      errmsg: "Username can't be empty",
      validator: isNonEmpty,
      isValid: false,
      showErrorMessage: false,
    },
    email: {
      label: 'Email :',
      id: 'email',
      type: 'email',
      value: '',
      error: '',
      errmsg: 'Please enter valid email',
      validator: validEmail,
      isValid: false,
      showErrorMessage: false,
    },
    password: {
      label: 'Password :',
      id: 'password',
      type: 'password',
      value: '',
      error: '',
      errmsg: 'Password must be minimum 5 characters long',
      validator: validPassword,
      isValid: false,
      showErrorMessage: false,
    },
    confirmPassword: {
      label: 'Confirm Password :',
      id: 'confirm-password',
      type: 'password',
      value: '',
      error: '',
      errmsg: 'Confirm password and password must be same',
      validator: value => validConfirmPassword(fields['password'].value, value),
      isValid: false,
      showErrorMessage: false,
    },
    phone: {
      label: 'Mobile No. :',
      id: 'phone',
      type: 'number',
      value: '',
      error: '',
      errmsg: "Number invalid, don't add any prefix (0 or +91)",
      validator: validPhoneNumber,
      isValid: false,
      showErrorMessage: false,
    },
  };
  $: allFieldsValid =
    fields.username.isValid &&
    fields.email.isValid &&
    fields.password.isValid &&
    fields.confirmPassword.isValid &&
    fields.phone.isValid;
  const validateField = fieldName => {
    if (fields[fieldName].validator) {
      let field = fields[fieldName];
      field.isValid = field.validator(field.value);
      if (!field.isValid) {
        field.error = field.errmsg;
      } else {
        field.error = '';
      }

      fields[fieldName] = field;
    }
  };
  let validateAddressFields = false;
  const submitHandler = validityCheck => {
    // console.log('submit called', validityCheck);
    if (addAddressLater) {
      resetAddressState();
    }
    if (validityCheck) {
      AuthStore.loginOrSignup(
        {
          username: fields.username.value,
          email: fields.email.value,
          password: fields.password.value,
          phones: [fields.phone.value],
          addresses: $AddressStore.matchedAddress,
        },
        true
      );
    } else {
      for (let field in fields) {
        validateField(field);
        fields[field].showErrorMessage = true;
      }
      validateAddressFields = true;
    }
  };
  let addAddressLater = false;
</script>

<!-- html -->
<div>
  <form on:submit|preventDefault>
    {#each Object.keys(fields) as field, i (field)}
      <!-- autofocus={i === 0} didn't used it here since change handler is not called if we autofocus and then remove focus -->
      <Input
        label={fields[field].label}
        id={fields[field].id}
        type={fields[field].type}
        value={fields[field].value}
        inputHandler={value => {
          fields[field].value = value;
          validateField(field);
        }}
        errorMessage={fields[field].showErrorMessage && fields[field].error ? fields[field].error : ''}
        changeHandler={value => {
          fields[field].showErrorMessage = true;
          // so that error message is show only when first time input is changed
        }}
      />
    {/each}
    <p>
      Add Address later instead :
      <input
        id="addroptout"
        type="checkbox"
        on:click={e => {
          // console.log(e.target.checked);
          addAddressLater = e.target.checked;
        }}
      />
    </p>

    {#if !addAddressLater}
      <AddressInput index={0} {validateAddressFields} />
    {/if}

    <Button
      type="success"
      on:click={() => {
        submitHandler(allFieldsValid && (addAddressLater || $AddressStore.matchedAddress[0].isValid));
      }}
    >
      Sign up
    </Button>
  </form>
</div>

<!-- /html -->
<style lang="scss">
  form {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
  @media (max-width: 900px) {
    form {
      width: 90%;
    }
  }
</style>
