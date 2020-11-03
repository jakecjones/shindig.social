
import Vue from 'vue'
import Vuex from 'vuex'
import { form } from './modules/form';
import { products } from './modules/products';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        form,
        products
    }
});