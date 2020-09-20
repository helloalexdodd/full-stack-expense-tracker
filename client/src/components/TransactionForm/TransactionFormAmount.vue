<template>
  <b-field label="Amount" for="amount" :message="amountValidation" :type="amountInvalid">
    <b-input
      @blur="convert(amount)"
      v-model="amount"
      controls-position="compact"
      icon="currency-usd"
      type="is-success"
      id="amount"
      name="amount"
      placeholder="Amount"
      min="0.01"
      expanded
    />
  </b-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TransactionFormAmount',
  computed: {
    amount: {
      get() {
        return this.$store.state.transactions.transaction.amount;
      },
      set(amount) {
        this.$store.commit('transactions/SET_TRANSACTION_AMOUNT', amount);
      },
    },
    ...mapGetters({
      amountInvalid: 'transactions/amountInvalid',
      amountValidation: 'transactions/amountValidation',
    }),
  },
  methods: {
    ...mapActions({
      convertToCurrency: 'transactions/convertToCurrency',
    }),
    async convert(amount) {
      const newAmount = await this.convertToCurrency(amount);
      this.amount = newAmount;
    },
  },
};
</script>
