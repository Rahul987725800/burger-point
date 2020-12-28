<script>
  import Login from '../components/auth/Login.svelte';
  import Signup from '../components/auth/Signup.svelte';
  import Button from '../shared/Button.svelte';
  import Loader from '../shared/Loader.svelte';
  import AuthStore from '../store/AuthStore';
  import Message from '../shared/Message.svelte';
  const tabs = {
    login: 'login',
    signup: 'signup',
  };
  let activeTab = tabs.login;
  let loading;
  let error;
  AuthStore.subscribe(state => {
    loading = state.loading;
    error = state.error;
  });
  let loadingMessage = '';
  $: {
    // console.log('tab changed so existing errors dismissed');

    switch (activeTab) {
      case tabs.login:
        loadingMessage = 'Logging you in...';
        break;
      case tabs.signup:
        loadingMessage = 'Signing you up...';
        break;
    }
    AuthStore.dismissError();
  }
</script>

<!-- html -->
<div>
  {#if loading}
    <Loader {loadingMessage} />
  {/if}
  {#if error}
    <Message type="danger" on:close={AuthStore.dismissError}>{error}</Message>
  {/if}
  {#if activeTab === tabs.login}
    <Login />

    <Button
      on:click={() => {
        activeTab = tabs.signup;
      }}
    >
      Don't have an account Signup instead
    </Button>
  {:else if activeTab === tabs.signup}
    <Signup />
    <Button
      on:click={() => {
        activeTab = tabs.login;
      }}
    >
      Go Back to Login
    </Button>
  {/if}
</div>

<!-- /html -->
<style>
  div {
    text-align: center;
  }
</style>
