<template>
  <div class="account">
    <h1>Account Detail</h1>
    <div v-if="loading" class="topMargin50 bottomMargin50">
      <pulse-loader></pulse-loader>
    </div>
    <div v-else>
  <div v-if="balance === null" class="topMargin50">
        <p>
          Account number <strong>{{account}}</strong> was not found
        </p>
      </div>
      <div v-else>
        <p>
          Account Number: 
          <span class="accountData">{{account}}</span>
        </p>
        <p>
          Account Balance: 
          <span class="accountData">{{numToUSD(balance)}}</span>
        </p>
        <div class="btn topMargin15" @click="deleteAccount">CLOSE ACCOUNT</div>
        <div class="newTransaction topMargin50">
          <h1>New Transaction</h1>
          <h4>Transaction Type:</h4>
          <select name="transactionType" id="transactionType" v-model="transactionType">
            <option value="Deposit">Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
          <h4>Amount:</h4>
          <div id="amountDiv">
            <span id="amountLabel">$&nbsp;</span>
            <span id="amountInput"><input name="amount" id="amount" v-model="transactionAmount" type="number" placeholder="0.00"></span>
          </div>
          <div :class="transactionType && transactionAmount && !isNaN(transactionAmount) && transactionAmount > 0 ? 'btn topMargin50' : 'disabledBtn topMargin50'" @click="updateBalance">SUBMIT</div>
          <div class="btn topMargin50" @click="clearSelected">CLEAR</div>
          <p v-if="message" class="errMsg">{{message}}</p>
        </div>
      </div>
      <div class="btn topMargin50" @click="returnHome">
        BACK TO ACCOUNT LIST
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Account',
  components: {
    PulseLoader
  },
  data() {
    return {
      account: this.$route.params.id,
      balance: null,
      transactionType: null,
      transactionAmount: null,
      message: null,
      loading: true
    }
  },
  methods: {
    getAccountBalance() {
      fetch(`${process.env.VUE_APP_BANK_ENDPOINT}dev/balance?account=${this.account}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        this.balance = data.balance ?? null
        this.loading = false
      })
      .catch(error => console.error('getAccountBalance error:', error))
    },
    numToUSD(num) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(num)
    },
    deleteAccount() {
      fetch(`${process.env.VUE_APP_BANK_ENDPOINT}dev/account?account=${this.account}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        console.log('Deleted account #', data.account)
        this.returnHome()
      })
      .catch(error => console.error('deleteAccount error:', error))
    },
    updateBalance() {
      if (!this.transactionType || !this.transactionAmount || isNaN(this.transactionAmount) || this.transactionAmount < 0){
        return
      }
      const amount = this.transactionType === 'Withdrawal' ? this.transactionAmount * -1 : this.transactionAmount
      if (this.balance + amount < 0) {
        this.message = 'Error! Cannot withdraw more than the account balance'
        return
      }
      fetch(`${process.env.VUE_APP_BANK_ENDPOINT}dev/balance?account=${this.account}&amount=${amount}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        this.balance = data.newBalance
        this.clearSelected()
      })
      .catch(error => {
        console.error('updateBalance error:', error)
        this.message = 'Error! Could not update account balance'
      })
    },
    clearSelected() {
      this.transactionType = null
      this.transactionAmount = null
      this.message = null
    },
    returnHome() {
      this.$router.push('/')
    }
  },
  async mounted() {
    this.getAccountBalance()
  }
}
</script>