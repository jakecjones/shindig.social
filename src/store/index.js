
import Vue from 'vue'
import Vuex from 'vuex'
import { form } from './modules/form';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        form
    }
});