<script>
  import Button from '../../shared/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { validPhoneNumber } from './inputValidators';
  import { buttonClasses } from '../../utils';
  export let userPhones;
  const dispatch = createEventDispatcher();
  let newPhoneProps = {
    number: '',
    isDefault: false,
    isValid: false,
    error: '',
  };

  userPhones = userPhones.map((phone, i) => {
    return {
      number: phone,
      isDefault: i === 0,
      isValid: true,
      error: '',
    };
  });
  const validatePhone = phone => {
    // console.log(phone);
    let valid = validPhoneNumber(phone.number);
    if (!valid) {
      phone.error = "Number invalid, don't add any prefix (0 or +91)";
      phone.isValid = false;
    } else {
      phone.error = '';
      phone.isValid = true;
    }
    userPhones = userPhones;
    return valid;
  };
</script>

<!-- html -->
<div class="container">
  {#each userPhones as phone, i (phone)}
    <div class="phone">
      <p class="label">Phone {i + 1} :&nbsp;&nbsp;</p>
      <p
        class="input"
        class:error-input={phone.error}
        contenteditable
        on:input={e => {
          // console.log(e.target.textContent + 'oninput');
          phone.number = e.target.textContent;
          validatePhone(phone);
        }}
        on:keypress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // to prevent user from entering new lines <br> in input
            // console.log('enter pressed');
          }
        }}
      >
        {phone.number}
      </p>
      <div class="icons">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          title="Make default"
          class:isDefault={phone.isDefault}
          on:click={() => {
            userPhones.forEach(p => {
              p.isDefault = false;
            });
            userPhones[i].isDefault = true;
          }}
        >&#9733;</a>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={() => {
            if (!phone.isDefault) {
              userPhones.splice(i, 1);
              userPhones = userPhones;
            }
          }}
          class:not-allowed={phone.isDefault}
          title={phone.isDefault ? 'Not allowed' : 'Delete'}
        >&#10005;</a>
      </div>
    </div>
    <p class="error">{phone.error}</p>
  {/each}
  <Button
    on:click={() => {
      // console.log('add new phone');
      userPhones = [...userPhones, { ...newPhoneProps }];
    }}
  >
    Add new
  </Button>
  <p>
    <Button
      type={buttonClasses.danger}
      on:click={() => {
        dispatch('cancelEdit');
      }}
    >
      Cancel
    </Button>
    <Button
      type={buttonClasses.success}
      on:click={() => {
        let allNumbersValid = true;
        for (let phone of userPhones) {
          allNumbersValid = validatePhone(phone) && allNumbersValid;
        }
        if (allNumbersValid) {
          dispatch('saveEdit', userPhones);
        } else {
          // here we can show some message
        }
      }}
    >
      Save Changes
    </Button>
  </p>
</div>

<!-- /html -->
<style lang="scss">
  $theme-red: #d91b42;
  .phone {
    display: flex;
    align-items: center;
    margin: 0;

    .input {
      flex: 4;
      border-bottom: 1px solid var(--theme-color);
      outline: none;
      &:focus {
        border-bottom: 2px solid var(--theme-color);
      }
    }
    .error-input {
      border-color: $theme-red;
    }
    .icons {
      flex: 1;
      @media (max-width: 900px) {
        flex: 2;
      }
      font-size: 1.5rem;
      display: flex;
      justify-content: space-around;
      a {
        color: rgb(112, 112, 112);
        text-decoration: none;
        cursor: pointer;
        &:hover {
          color: $theme-red;
        }
        &.isDefault {
          color: $theme-red;
        }
        &.not-allowed {
          cursor: not-allowed;
          &:hover {
            color: rgb(112, 112, 112);
          }
        }
      }
    }
  }
  .error {
    font-weight: bold;
    font-size: 12px;
    color: $theme-red;
  }
</style>
