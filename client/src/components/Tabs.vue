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
import Income from '@/components/Income.vue';
import Expenses from '@/components/Expenses.vue';

export default {
  name: 'Tabs',
  components: {
    Income,
    Expenses,
  },
  methods: {
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
