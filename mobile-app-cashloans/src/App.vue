<template>
  <div id="app">
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
  </div>
</template>

<script>
import Home from './components/Home.vue'
import About from './components/About.vue'

export default {
  name: 'app',
  components: {
    Home,
    About
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'ion-card',
          label: 'Liste des prêts',
          page: Home,
          key: "home-page"
        },
        {
          icon: this.md() ? null : 'ion-information-circled',
          label: 'À propos',
          page: About,
          key: "about-page"
        }
      ]
    };
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
