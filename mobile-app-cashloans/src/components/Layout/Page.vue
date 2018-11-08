<template id="page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="auto"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
    >
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Loans from '../Loans.vue'
import About from '../About.vue'
import Parameters from '../Parameters.vue'

export default {
  name: 'Page',
  components: {
    Loans,
    About
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'fa-credit-card',
          label: 'Liste des prêts',
          page: Loans,
          key: "loans-page"
        },
        {
          icon: this.md() ? null : 'fa-cog',
          label: 'Paramètres',
          page: Parameters,
          key: "parameters-page"
        },
        {
          icon: this.md() ? null : 'fa-question-circle',
          label: 'À propos',
          page: About,
          key: "about-page"
        }
      ],
      pageStack: [Loans, About]
    }
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
}
</script>

<style>

</style>