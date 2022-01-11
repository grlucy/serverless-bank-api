<template>
  <div class="card">
    <h4 class="accountData">{{account}}</h4>
    <h2>{{numToUSD(balance)}}</h2>
    <hr>
    <div class="cardBtn" @click="goToAccountPage(account)">
      View Account
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  props: ['account', 'balance'],
  methods: {
    numToUSD(num) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(num)
    },
    goToAccountPage(account) {
      this.$router.push(`/account/${account}`)
    }
  }
}
</script>