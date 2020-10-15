<template>
  <div>
    <h2 class="legend my-3 py-2">Transaction History</h2>
    <p v-if="!transactions.length">Enter a transaction to add it to your history!</p>
    <div
      v-for="transaction in transactions"
      @click="toggleShowDetails(transaction)"
      :key="transaction._id"
      :class="transaction.type"
      class="box"
    >
      <div class="columns is-mobile">
        <div class="column">
          <h3 class="has-text-weight-bold">
            {{ transaction.description }}
          </h3>
        </div>
        <div class="column">
          <p class="has-text-right">${{ transaction.amount.toFixed(2) }}</p>
        </div>
        <div class="buttons">
          <b-button type="is-danger" icon-right="delete" @click="removeTransaction(transaction._id)" @click.stop />
        </div>
      </div>
      <div v-if="transaction.showDetails" class="column is-full" @click.stop>
        <div class="columns is-mobile">
          <h4 class="column has-text-weight-medium">
            {{ transaction.account.name }}
          </h4>
          <h4 class="column has-text-right">
            {{ formatDate(transaction) }}
          </h4>
        </div>
        <div v-if="!transaction.editNote" @click="openEdit(transaction)" class="level is-mobile">
          <p class="level-left">{{ transaction.notes }}</p>
          <b-icon class="level-right" icon="pencil-outline" size="is-small"> </b-icon>
        </div>
        <div v-else>
          <b-field for="notes">
            <b-input id="notes" v-model="transaction.notes" type="textarea" name="notes" />
          </b-field>
          <div class="level is-mobile">
            <div class="level-right" />
            <div class="buttons level-right">
              <b-button type="is-success" icon-right="check" @click="updateTransaction(transaction)" />
              <b-button type="is-danger" icon-right="delete" @click="abandonEdit(transaction)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    oldNote: '',
  }),
  computed: {
    ...mapGetters({
      transactions: 'transactions/transactions',
    }),
  },
  methods: {
    ...mapActions({
      removeTransaction: 'transactions/removeTransaction',
      editTransaction: 'transactions/editTransaction',
    }),
    formatDate(transaction) {
      return new Date(transaction.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    async updateTransaction(transaction) {
      await this.editTransaction(transaction);
      transaction.editNote = false;
    },
    toggleShowDetails(transaction) {
      if (transaction.showDetails) transaction.editNote = false;
      transaction.showDetails = !transaction.showDetails;
    },
    openEdit(transaction) {
      this.oldNote = transaction.notes;
      transaction.editNote = true;
    },
    abandonEdit(transaction) {
      transaction.notes = this.oldNote;
      this.oldNote = '';
      transaction.editNote = false;
    },
  },
};
</script>

<style scoped>
.box.income {
  border-left: 5px solid #3ec46d;
}

.box.expense {
  border-left: 5px solid #f03a5f;
  cursor: pointer;
}

.box,
.column.column.is-full .level {
  cursor: pointer;
}

.column.is-full {
  cursor: default;
}
</style>
