<script>
  import Input from './Input.svelte';
  import Button from '../../shared/Button.svelte';
  import { validEmail, isNonEmpty } from './inputValidators.js';
  import AuthStore from '../../store/AuthStore';
  let fields = {
    email: {
      label: 'Email :',
      id: 'email',
      type: 'email',
      value: '',
      error: '',
      errmsg: 'Please enter valid email',
      validator: validEmail,
    },
    password: {
      label: 'Password :',
      id: 'password',
      type: 'password',
      value: '',
      error: '',
      errmsg: 'Password cannot be empty',
      validator: isNonEmpty,
    },
  };

  const validateField = fieldName => {
    let field = fields[fieldName];
    let isValid = field.validator(field.value);
    if (!isValid) {
      field.error = field.errmsg;
    } else {
      field.error = '';
    }
    // fields[fieldName] = field;
    // optional since we can update ui just once after validating all fields
    return isValid;
  };
  const submitHandler = () => {
    // console.log('submitted');
    let valid = true;
    for (let field in fields) {
      // console.log(fields[field].value);
      valid = validateField(field) && valid;
      // validateField(field) should come first so that we validate all fields
    }
    fields = fields;
    // this is to update the ui once all fields are validated
    // but if update is called on each field validation then not needed
    if (valid) {
      // console.log(fields);

      AuthStore.loginOrSignup(
        { email: fields.email.value, password: fields.password.value },
        false
      );
    }
  };
</script>

<!-- html -->
<div>
  <form on:submit|preventDefault>
    {#each Object.keys(fields) as field, i (field)}
      <Input
        autofocus={i === 0}
        label={fields[field].label}
        id={fields[field].id}
        type={fields[field].type}
        value={fields[field].value}
        inputHandler={value => (fields[field].value = value)}
        errorMessage={fields[field].error}
      />
    {/each}

    <Button type="success" on:click={submitHandler}>Login</Button>
  </form>
</div>

<!-- /html -->
<style>
  form {
    width: 30%;
    margin: 0 auto;
    text-align: center;
  }
  @media (max-width: 900px) {
    form {
      width: 80%;
    }
  }
</style>
