<template id="loans-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Liste des prêts</div>
      <div class="right">
        <v-ons-toolbar-button @click="addLoan">
          <v-ons-icon icon="fa-plus-circle" class="list-item__icon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-item v-for="loan in loans" :key="loan.id" @click="getLoanDetail(loan.id)">
        <div class="center">
          <span class="list-item__title">{{ loan.borrower_name }}</span>
          <span class="list-item__subtitle loan-date">Prêté le {{ loan.loan_date | moment('DD.MM.YYYY')}}</span>
          <span class="list-item__subtitle loan-returned">{{ (loan.returned) ? 'Remboursé' : 'Non remboursé' }}</span>
        </div>
        <div class="right">
          CHF {{ loan.amount | twoDecimal }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<style scoped>
  .center .loan-date {
    opacity: 0.75;
  }

  .center .loan-returned {
    opacity: 0.5;
  }
</style>

<script>
  import LoansService from '../../services/LoansService'

  export default {
    name: 'Loans',
    template: '#loans-page',
    data() {
      return {
        loans: [],
      }
    },
    created: function() {
      LoansService.getAll()
        .then(data => {
          this.loans = data;
        })
        //.catch(err => console.log(err))
    },
    methods: {
      getLoanDetail(id) {
        this.$router.push({ name: 'LoanDetail', params: { id: id }})
      },
      addLoan() {
        this.$router.push({ name: 'NewLoan'})
      }
    }
  }
</script>