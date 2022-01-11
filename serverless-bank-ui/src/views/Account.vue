<template>
  <div class="account">
    <h1>Account Detail</h1>
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
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      account: this.$route.params.id,
      balance: null,
      transactionType: null,
      transactionAmount: null,
      message: null
    }
  },
  methods: {
    getAccountBalance() {
      this.balance = 50
    },
    numToUSD(num) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return formatter.format(num)
    },
    deleteAccount() {
      console.log('deleting:', this.account)
      this.returnHome()
    },
    updateBalance() {
      if (!this.transactionType || !this.transactionAmount || isNaN(this.transactionAmount) && this.transactionAmount > 0){
        return
      }
      // API request & handle response
      console.log('updating balance')
      // if success, clearSelected()
      // else update this.message
      this.message = "Error!"
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