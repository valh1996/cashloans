<template id="home-page">
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item v-for="loan in loans" :key="loan.id" @click="push">
        <div class="center">
          <span class="list-item__title">{{ loan.borrower_name }}</span><span class="list-item__subtitle">{{ (loan.returned) ? 'Remboursé' : 'Non remboursé' }}</span>
        </div>
        <div class="right">
          CHF {{ loan.amount | twoDecimal }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<style scoped>
  /* CSS goes here */
</style>

<script >
  import LoanDetail from './LoanDetail'
  import LoansService from '../services/LoansService'

  export default {
    name: 'Home',
    template: '#home-page',
    data() {
      return {
        loans: [],
      }
    },
    created: function() {
      LoansService.getAll()
        .then(response => {
          this.loans = response.data;
        })
        .catch(err => console.log(err))

    },
    methods: {
      push() {
        this.$emit('push-page', LoanDetail);
      }
    }
  }
</script>