import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from '../../../config/firebase';
import Vue from 'vue';

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

Vue.use(firebase);
const db = firebase.firestore();

const state = {
    products: []
};

const getters = {
    products: (state) => state.products
};

const mutations = {
    loadProducts(state, payload) {
        state.products = payload;
    }
}
const actions = {
    CREATE_SUBMISSION(context, payload) {
        context;
        const createdAt = new Date();
        
        db.collection("mail").add(payload)
        .then((docRef) => {
          return db.collection("mail").doc(docRef.id)
            .update({
                id: docRef.id,
                createdAt: createdAt
            })
        })
    },
    LOAD_PRODUCTS(context) {
        db.collection("products")
        .onSnapshot(function(querySnapshot) {
          const products = [];
          querySnapshot.forEach(function(doc) {
            products.push(doc.data());
          });
          context.commit("loadProducts", products);
        });
      },
      async LOAD_PRODUCT (context, id) {
          context;
          let result;
          try {
            result = await db.collection("products").doc(id).get();
            return result.data()

          } catch (error) {
              console.log(error)
          }
      },
      async CREATE_PRODUCT(context, payload) {
        context;
        const createdAt = new Date();
        return db
          .collection("products")
          .add(payload)
          .then((docRef) => {
              db.collection("products").doc(docRef.id)
              .update({
                  id: docRef.id,
                  createdAt: createdAt,
                })
          });
      },
      UPDATE_PRODUCT(context, payload) {
        context;
        payload.updatedAt = new Date();
        db.collection("products")
          .doc(payload.id)
          .set(
            payload,
            { merge: true }
          );
      },
}

export const products = {
    state,
    mutations,
    actions,
    getters,
}