<template id="about-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">À propos</div>
    </v-ons-toolbar>

    <p>
      Application développée par <a href="https://valentinhutter.ch/">valentinhutter.ch</a>
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
    name: 'About',
    template: '#about-page'
  }
</script>