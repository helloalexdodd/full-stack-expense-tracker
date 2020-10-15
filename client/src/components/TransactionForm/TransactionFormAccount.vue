<template>
  <div class="mb-5">
    <div v-if="!showAddAccount">
      <b-field label="Account" for="account" :message="accountValidation" :type="accountInvalid">
        <b-select
          @focus="setError({ name: 'account', error: {} })"
          v-model="account"
          id="account"
          name="account"
          placeholder="Select or create an account"
          icon="cash"
          expanded
        >
          <option>
            Select or create an account
          </option>
          <option v-for="account in accounts" :key="account.id" :value="account">
            {{ account.name }}
          </option>
        </b-select>
        <button type="button" class="button ml-3" @click="setEventHandler(account)">
          <b-icon :icon="icon" />
        </button>
      </b-field>
    </div>
    <div v-if="showAddAccount">
      <b-field label="Add New Account" for="addNewAccount" :message="accountValidation" :type="accountInvalid">
        <b-input
          @focus="setError({ name: 'account', error: {} })"
          v-model="newAccount"
          ref="addNewAccount"
          id="addNewAccount"
          name="addNewAccount"
          placeholder="i.e. Personal Savings"
          expanded
        />
        <button type="button" class="button ml-3" @click="setEventHandler">
          <b-icon :icon="icon" />
        </button>
      </b-field>
    </div>
    <div v-if="showButtons" class="buttons is-centered mt-4">
      <b-button type="is-success is-light" icon-left="plus-circle" @click="addNewAccount()">
        Add New Account
      </b-button>
    </div>
    <b-modal v-model="isModalActive" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Are you sure?</p>
          <button type="button" class="delete" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          <p class="subtitle is-6">Do you want to permanently delete this account?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeModal">Cancel</button>
          <button class="button is-danger" type="button" @click="removeSelectedAccount(account)">Remove Account</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TransactionFormAccount',
  data: () => ({
    showButtons: false,
    showAddAccount: false,
    selected: '',
    newAccount: '',
    isModalActive: false,
  }),
  computed: {
    account: {
      get() {
        return this.$store.state.transactions.transaction.account;
      },
      set(account) {
        this.$store.commit('transactions/SET_TRANSACTION_ACCOUNT', account);
      },
    },
    icon: {
      get() {
        if (this.account?.name && !this.showButtons) return 'delete-outline';
        if (this.showButtons) return 'close';
        return 'plus';
      },
    },
    ...mapGetters({
      accounts: 'transactions/accounts',
      accountInvalid: 'transactions/accountInvalid',
      accountValidation: 'transactions/accountValidation',
    }),
  },
  beforeUpdate() {
    if (!this.accounts.length) {
      this.showButtons = true;
      this.showAddAccount = true;
    }
  },
  methods: {
    ...mapActions({
      addAccount: 'transactions/addAccount',
      removeAccount: 'transactions/removeAccount',
    }),
    ...mapMutations({
      setError: 'transactions/SET_ERROR',
      setAccount: 'transactions/SET_TRANSACTION_ACCOUNT',
    }),
    async addNewAccount() {
      if (!this.newAccount) {
        this.setError({
          name: 'account',
          error: { message: 'Please enter an account name' },
        });
      } else {
        await this.addAccount(this.newAccount);
        this.newAccount = '';
        this.showAddAccount = false;
        this.showButtons = false;
      }
    },
    toggleAddAccount() {
      if (!this.accounts.length && this.showButtons) {
        this.setError({
          name: 'account',
          error: { message: 'You must add an account to associate with each transaction' },
        });
      }
      this.showAddAccount = !this.showAddAccount;
      this.showButtons = !this.showButtons;
      this.newAccount = '';
    },
    updateAccount(e) {
      this.$store.commit('transactions/SET_TRANSACTION_ACCOUNT', e);
    },
    setEventHandler() {
      if (this.account?.name && !this.showButtons) {
        this.isModalActive = true;
        return false;
      }
      if (this.showButtons) return this.toggleAddAccount();
      return this.toggleAddAccount();
    },
    closeModal() {
      this.isModalActive = false;
    },
    removeSelectedAccount(account) {
      this.removeAccount(account);
      this.closeModal();
    },
  },
};
</script>
