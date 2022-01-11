<template>
  <div class="home">
    <h1>Customer Accounts</h1>
    <div class="cardContainer" v-if="accounts?.length > 0">
      <AccountCard v-for="item in accounts" :key="item.account" :account="item.account" :balance="item.balance"/>
    </div>
    <p v-else class="topMargin50">
      No customer accounts found
    </p>
    <div :class="accounts.length >= 10 ? 'disabledBtn' : 'btn'" @click="createAccount">
      OPEN A NEW ACCOUNT
    </div>
    <p>
      <i>* Limit 10 accounts per customer</i>
    </p>
  </div>
</template>

<script>
import AccountCard from '@/components/AccountCard.vue'

export default {
  name: 'Home',
  components: {
    AccountCard
  },
  data() {
    return {
      accounts: [
        {
          account: "897650607",
          balance: 500
        },
        {
          account: "424043114",
          balance: 0
        }
      ]
    }
  },
  methods: {
    getAccountList() {
      console.log('getting account list')
    },
    createAccount() {
      if (this.accounts.length >= 10) return
      console.log('creating new account')
      this.getAccountList()
    }
  },
  async mounted() {
    this.getAccountList()
  }
}
</script>
