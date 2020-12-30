<script>
  import Card from '../../shared/Card.svelte';
  export let address;
  export let defaultClickHandler;
  // console.log(address);
</script>

<!-- html -->
<Card>
  <div class="preview">
    <!-- svelte-ignore a11y-missing-attribute -->
    <p class="icon">
      <a
        title="Make default"
        class:isDefault={address.isDefault}
        on:click={() => {
          // console.log('clicked');
          if (!address.isDefault) {
            defaultClickHandler();
          }
        }}
      >&#9733;</a>
    </p>

    <p>
      Address :&nbsp;
      {address.inputAddress.address1}
      {address.inputAddress.address2}
    </p>

    <p>Pincode : {address.Pincode}</p>
    <p>
      Selected Address :&nbsp;
      {address.Name},
      {address.District},
      {address.Division},
      {address.Region},
      {address.Circle}
    </p>
    <div class="controls">
      <slot />
    </div>
  </div>
</Card>

<!-- /html -->
<style lang="scss">
  $theme-red: #d91b42;
  .preview {
    padding: 1rem;
    padding-top: 0;
    .icon {
      line-height: 0;
      text-align: right;
      font-size: 1.5rem;
      padding-top: 1.4rem;
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
      }
    }
  }
</style>
