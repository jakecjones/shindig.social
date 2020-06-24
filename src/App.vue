<template>
  <v-app>
      <Navigation />
      <BackgroundDecor />
      <v-container>
        <router-view/>
      </v-container>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import BackgroundDecor from '@/components/BackgroundDecor.vue'

    export default {
        components: {
          BackgroundDecor,
          Navigation
        }
    }
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

@font-face {
  font-family: "Bon Vivant Serif Bold";
  src: url("./assets/fonts/BonVivantSerifBold.otf") format("opentype");
}
#app {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #FBF9F8;
  a {
    text-decoration: unset;
    color: unset;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: unset;
    color: unset;

    &.router-link-exact-active {
      color: unset;
    }
  }
}
</style>
