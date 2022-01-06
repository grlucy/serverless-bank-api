let app = Vue.createApp({
    data() {
        return {
            accounts: [
                {
                    account: "897650607",
                    balance: 50
                },
                {
                    account: "424043114",
                    balance: 0
                }
            ],
            selectedAccount: null,
            transactionType: null,
            transactionAmount: null,
            message: null
        }
    },
    methods: {
        updateBalance(account, method, amount) {
            if (!account || !method || !amount || isNaN(amount)){
                this.message = 'Invalid transaction request. Please provide a valid transaction type and amount.'
                return
            }
            // API request & handle response
            // if success, clearSelected()
            // else update this.message
        },
        clearSelected() {
            this.selectedAccount = null
            this.transactionType = null
            this.transactionAmount = null
        },
        deleteAccount(account) {
            console.log('deleting:', account)
        },
        createAccount() {
            if (this.accounts.length >= 10) return
            console.log('creating new account')
        },
        numToUSD(num) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            })
            return formatter.format(num)
        }
    },
    async mounted() {
        console.log('getting account list')
    }
})

app.mount('#app')