<template>
  <b-tabs v-model="activeTab" position="is-centered" class="block" expanded animated>
    <b-tab-item label="Income">
      <transaction-form transaction-type="income" />
    </b-tab-item>
    <b-tab-item label="Expenses">
      <transaction-form transaction-type="expense" />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import TransactionForm from '@/components/TransactionForm.vue';

export default {
  name: 'Tabs',
  components: {
    TransactionForm,
  },
  data: () => ({
    activeTab: 0,
  }),
};
</script>
