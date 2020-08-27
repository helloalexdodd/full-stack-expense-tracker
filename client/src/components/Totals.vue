<template>
  <div class="box has-text-centered">
    <h3 class="has-text-weight-bold">{{ title }}</h3>
    <p class="has-text-weight-semibold is-size-4" :class="textColor()">
      {{ amount }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Totals',
  props: {
    title: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  methods: {
    textColor() {
      const amount = this.amount.substring(1);
      if (this.title === 'Income') return 'has-text-success';
      if (this.title === 'Expenses') return 'has-text-danger';
      if (amount > 0) return 'has-text-success';
      if (amount < 0) return 'has-text-danger';
      return 'has-text-black';
    },
  },
};
</script>
