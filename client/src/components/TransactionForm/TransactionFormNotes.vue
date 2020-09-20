<template>
  <b-field label="Notes" for="notes" :message="notesValidation" :type="notesInvalid">
    <b-input id="notes" v-model="notes" type="textarea" name="notes" />
  </b-field>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TransactionFormNotes',
  computed: {
    notes: {
      get() {
        return this.$store.state.transactions.transaction.notes;
      },
      set(notes) {
        this.$store.commit('transactions/SET_TRANSACTION_NOTES', notes);
      },
    },
    ...mapGetters({
      notesInvalid: 'transactions/notesInvalid',
      notesValidation: 'transactions/notesValidation',
    }),
  },
  methods: {
    ...mapMutations({
      setNotes: 'transactions/SET_TRANSACTION_NOTES',
    }),
    updateNotes(e) {
      this.$store.commit('transactions/SET_TRANSACTION_NOTES', e);
    },
  },
};
</script>
