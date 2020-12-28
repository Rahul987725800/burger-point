<script>
  export let type;
  export let flavour = false;
</script>

<!-- html -->
<div class="bun {type}" class:flavour />

<!-- /html -->
<style>
  .bun {
    margin: 0.2rem;
  }
  .flavour {
    height: 2rem;
    border-radius: 20px;
  }
  .upper {
    height: 3rem;
    background: linear-gradient(#bc581e, #e27b36);
    border-radius: 50% 50% 0 0;
    box-shadow: inset -15px 0 #c15711;
  }
  .lower {
    height: 3rem;
    background: linear-gradient(#f08e4a, #e27b36);
    border-radius: 0 0 30px 30px;
    box-shadow: inset -15px 0 #c15711;
  }
  .cheese {
    background: linear-gradient(#f4d004, #d6bb22);
  }
  .meat {
    background: linear-gradient(#7f3608, #702e05);
  }
  .salad {
    background: linear-gradient(#228c1d, #91ce50);
  }
  .bacon {
    background: linear-gradient(#bf3813, #c45e38);
  }
</style>
