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

  export default {
    name: 'Home',
    template: '#home-page',
    data() {
      return {
        loans: [],
      }
    },
    created: function() {
      this.axios.get(`${process.env.VUE_APP_API_ENDPOINT}/loans`, {
        headers: {
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU0MTA3NDY3N30.0tNRbgK01KPwSv2oma1rMMJEf-55leSj6Mm5PcyS9DA'
        }
      }).then((response) => {
        this.loans = response.data;
      })

    },
    methods: {
      push() {
        this.$emit('push-page', LoanDetail);
      }
    }
  }
</script>