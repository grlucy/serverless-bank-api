<template>
  <div class="home">
    <h1>Customer Accounts</h1>
    <div v-if="loading" class="topMargin50 bottomMargin50">
      <pulse-loader></pulse-loader>
    </div>
    <div v-else>
      <div class="cardContainer" v-if="accounts?.length > 0">
        <AccountCard v-for="item in accounts" :key="item.account" :account="item.account" :balance="item.balance"/>
      </div>
      <p v-else class="topMargin50 bottomMargin50">
        No customer accounts found
      </p>
      <div :class="accounts.length >= 10 ? 'disabledBtn' : 'btn'" @click="createAccount">
        OPEN A NEW ACCOUNT
      </div>
      <p>
        <i>* Limit 10 accounts per customer</i>
      </p>
    </div>
  </div>
</template>

<script>
import AccountCard from '@/components/AccountCard.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Home',
  components: {
    AccountCard,
    PulseLoader
  },
  data() {
    return {
      accounts: [],
      loading: true
    }
  },
  methods: {
    async getAccountList() {
      fetch(`${process.env.VUE_APP_BANK_ENDPOINT}dev/account/list`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        this.accounts = data.accounts
        this.loading = false
      })
      .catch(error => console.error('getAccountList error:', error))
    },
    createAccount() {
      if (this.accounts.length >= 10) return
      fetch(`${process.env.VUE_APP_BANK_ENDPOINT}dev/account`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        console.log('Created account #', data.account)
        this.getAccountList()
      })
      .catch(error => console.error('createAccount error:', error))
    }
  },
  mounted() {
    this.getAccountList()
  }
}
</script>
