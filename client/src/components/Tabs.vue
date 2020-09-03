<template>
  <b-tabs position="is-centered" class="block" expanded animated>
    <b-tab-item label="Income">
      <income @convert-to-currency="convertToCurrency" />
    </b-tab-item>
    <b-tab-item label="Expenses">
      <expenses @convert-to-currency="convertToCurrency" />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { mapActions } from 'vuex';
import Income from '@/components/Income.vue';
import Expenses from '@/components/Expenses.vue';

export default {
  name: 'Tabs',
  components: {
    Income,
    Expenses,
  },
  methods: {
    ...mapActions({
      addTransactionStore: 'transactions/addTransaction',
    }),
    async addTransaction(type) {
      const data = await this.addTransactionStore({ transaction: this.transaction, type });
      const error = data.message;
      if (error?.includes('username')) {
        this.usernameInvalid = 'is-danger';
        this.usernameValidation = error;
      }
      if (error?.includes('email')) {
        this.emailInvalid = 'is-danger';
        this.emailValidation = error;
      }
      if (error?.includes('password')) {
        this.passwordInvalid = 'is-danger';
        this.passwordValidation = error;
      } else {
        this.transaction.title = '';
        this.transaction.amount = '';
        this.transaction.notes = '';
        this.transaction.type = '';
      }
    },
    convertToCurrency(amount) {
      if (amount) {
        const currency = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        })
          .format(amount)
          .substring(1)
          .split('')
          .filter((char) => char !== ',')
          .join('');
        this.transaction.amount = Number(currency).toFixed(2);
      }
    },
  },
};
</script>
