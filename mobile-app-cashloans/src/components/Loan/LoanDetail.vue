<template id="loan-detail-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left back">
        <v-ons-toolbar-button @click="back">
          <v-ons-icon icon="fa-chevron-left" class="list-item__icon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center title">Détail de l'emprunt</div>
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
</style>

<script>
  export default {
    name: 'LoanDetail',
    template: '#loan-detail-page',
    props: ['id'],
    methods: {
      back() {
        this.$router.push({ name: 'Layout'})
      },
    },
  }
</script>