<template>
  <b-field label="Description" for="description" :message="descriptionValidation" :type="descriptionInvalid">
    <b-input id="description" v-model="description" name="description" placeholder="Description" />
  </b-field>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionFormDescription',
  computed: {
    description: {
      get() {
        return this.$store.state.transactions.transaction.description;
      },
      set(desc) {
        this.$store.commit('transactions/SET_TRANSACTION_DESCRIPTION', desc);
      },
    },
    ...mapGetters({
      descriptionInvalid: 'transactions/descriptionInvalid',
      descriptionValidation: 'transactions/descriptionValidation',
    }),
  },
};
</script>
