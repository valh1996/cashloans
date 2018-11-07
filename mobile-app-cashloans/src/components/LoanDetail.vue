<template id="loan-detail-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <a @click="back">
          <v-ons-icon icon="fa-chevron-left" class="list-item__icon"></v-ons-icon>
          <span>Retour</span>
        </a>
      </div>
      <div class="center">Détail de l'emprunt</div>
    </v-ons-toolbar>
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
  .list-item__icon {
    font-size: 16px!important;
  }
</style>

<script>
  export default {
    name: 'LoanDetail',
    template: '#loan-detail-page',
    props: ['id'],
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
  }
</script>