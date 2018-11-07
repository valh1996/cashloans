<template id="loan-detail-page">
  <v-ons-page>
    <p>
      Emprunt #{{ id }}
    </p>
  </v-ons-page>
</template>

<style scoped>
  p {
    text-align: center;
    padding: 20px;
  }
</style>

<script>
  export default {
    name: 'LoanDetail',
    template: '#loan-detail-page',
    props: ['id'],
    data() {
      return {

      }
    },
  }
</script>