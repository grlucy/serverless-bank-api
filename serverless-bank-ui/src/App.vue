<template>
  <div id="nav">
    <router-link to="/">SERVERLESS BANK</router-link>
  </div>
  <router-view :accounts="accounts" />
</template>

<script>
export default {
  data() {
    return {
      selectedAccount: null,
      transactionType: null,
      transactionAmount: null,
      message: null
    }
  }
}
</script>
