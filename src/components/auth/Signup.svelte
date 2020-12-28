<script>
  import Input from './Input.svelte';
  import Button from '../../shared/Button.svelte';
  import AuthStore from '../../store/AuthStore';

  import {
    validEmail,
    validPassword,
    validConfirmPassword,
    isNonEmpty,
    validPinCode,
    validPhoneNumber,
  } from './inputValidators.js';

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
    address1: {
      label: 'Address line 1 :',
      id: 'address1',
      type: 'text',
      value: '',
      error: '',
      errmsg: "Address can't be empty",
      validator: isNonEmpty,
      isValid: false,
      showErrorMessage: false,
    },
    address2: {
      label: 'Address line 2 (optional) :',
      id: 'address2',
      type: 'text',
      value: '',
    },
    pincode: {
      label: 'Pin Code :',
      id: 'pin-code',
      type: 'number',
      value: '',
      error: '',
      errmsg: 'Please enter a valid pin code',
      validator: async pincode => {
        const result = await validPinCode(
          pincode,
          fields.address1.value + fields.address2.value
        );
        // console.log(result);
        return result;
      },
      isValid: false,
      showErrorMessage: false,
    },
    addressDropdown: {
      label: 'Select Address :',
      id: 'address-dropdown',
    },
  };
  $: allFieldsValid =
    fields.username.isValid &&
    fields.email.isValid &&
    fields.confirmPassword.isValid &&
    fields.phone.isValid &&
    fields.address1.isValid &&
    fields.pincode.isValid;
  const validateField = async fieldName => {
    if (fields[fieldName].validator) {
      let field = fields[fieldName];
      field.isValid = await field.validator(field.value);
      if (!field.isValid) {
        field.error = field.errmsg;
      } else {
        field.error = '';
      }

      fields[fieldName] = field;
    }
  };

  const submitHandler = () => {
    // console.log(fields);
    AuthStore.loginOrSignup(
      {
        username: fields.username.value,
        email: fields.email.value,
        password: fields.password.value,
      },
      true
    );
  };
</script>

<!-- html -->
<div>
  <form on:submit|preventDefault={submitHandler}>
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

    <Button type="success" disabled={!allFieldsValid}>Sign up</Button>
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
      width: 80%;
    }
  }
</style>
