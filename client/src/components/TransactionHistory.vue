<template>
  <div>
    <h2 class="legend my-3 py-2">Transaction History</h2>
    <p v-if="!transactions.length">Enter a transaction to add it to your history!</p>
    <div
      v-for="transaction in transactions"
      :key="transaction._id"
      :class="transaction.type"
      class="box"
    >
      <div @click="transaction.showDetails = !transaction.showDetails" class="columns">
        <div class="column">
          <h3 class="has-text-weight-bold">{{ transaction.title }}</h3>
        </div>
        <div class="column">
          <p class="has-text-right">${{ transaction.amount.toFixed(2) }}</p>
        </div>
        <div class="buttons">
          <b-button
            @click="$emit('remove-transaction', transaction)"
            type="is-danger"
            icon-right="delete"
          />
        </div>
      </div>
      <div v-if="transaction.showDetails" class="column is-full">
        <div class="columns">
          <h4 class="column">Notes</h4>
          <h4 class="column has-text-right">
            {{
              new Date(transaction.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}
          </h4>
        </div>
        <p>{{ transaction.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
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
}

.box {
  cursor: pointer;
}
</style>
