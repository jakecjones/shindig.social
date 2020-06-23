import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#DDBFB3',
            secondary: '#EFE7E3',
            accent: '#FBF9F8',
            error: '#DDBFB3'
          },
        },
      }
});
