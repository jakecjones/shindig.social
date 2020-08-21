<template>
  <v-app>
      <Navigation />
      <BackgroundDecor />
      <v-container class="pa-0">
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
  padding-top: 40px;
  a {
    text-decoration: unset;
    color: unset;
  }
}

// UTILITY CLASSES
.primary-text {
  font-family: 'Bon Vivant Serif Bold', serif;
}
.uppercase {
  text-transform: uppercase;
}
.lp-5 {
  letter-spacing: 5px;
}
.lp-0 {
  letter-spacing: 1px;
}
.page-title {
  position: relative;
  background-color: black;
  color: #fff;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
  margin: 1em 0;
  position: relative;
  
  &__text {
    width: auto;
    font-size: 20px;
    display: flex;
    margin-right: 10px;
    padding: 10px;
  }
  &__number {
      font-size: 12px;
      margin: 2px 5px 0 0;
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
