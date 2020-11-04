import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from '../../../config/firebase';
import Vue from 'vue';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

Vue.use(firebase);
const db = firebase.firestore();

const state = {
  allImages: []
};

const getters = {
  allImages: (state) => state.allImages
};

const mutations = {
  loadImages(state, payload) {
      state.allImages = payload;
  }
}

const actions = {
    async LOAD_IMAGES(context, id) {
        let images = [];
        try {
            images = await context.dispatch('FETCH_IMAGES', id);
        } catch (error) {
            console.log(error);
        }

        return images;

    },
    FETCH_IMAGES(context, id){
        let images = [];
        db.collection("images").where("productId", "==", id)
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                images.push(doc.data())
            });
        }); 

        return images;
    },
    FETCH_ALL_IMAGES(context){
      db.collection("images")
      .onSnapshot(function(querySnapshot) {
        let images = [];
        querySnapshot.forEach(function(doc) {
            images.push(doc.data())
        });
        context.commit('loadImages', images);
      });
  },
  async ADD_IMAGES(context, payload) {
    context;
    payload.images.forEach((image) => {
        const newImage = {};
        newImage.createdAt = new Date();
        newImage.name = image.name;
        newImage.size = image.size;
        newImage.type = image.type;

      db.collection("images")
        .add(newImage)
        .then((docRef) => {
          db.collection("images")
            .doc(docRef.id)
            .update({
              id: docRef.id,
            });

          const fileRef = `/images/${newImage.name}`;

          firebase
            .storage()
            .ref(fileRef)
            .put(image)
            .then(() => {
              firebase
                .storage()
                .ref(fileRef)
                .getDownloadURL()
                .then((url) => {
                  db.collection("images")
                    .doc(docRef.id)
                    .update({
                      url: url,
                    });
                });
            });
        });
    });
  },
    async ADD_PRODUCT_IMAGES(context, payload) {
        context;
        payload.images.forEach((image, index) => {
            const newImage = {};
            newImage.createdAt = new Date();
            newImage.name = image.name;
            newImage.size = image.size;
            newImage.type = image.type;
            newImage.productId = payload.id;
            newImage.active = payload.imageData[index].active;
            newImage.alt = payload.imageData[index].alt;

          db.collection("images")
            .add(newImage)
            .then((docRef) => {
              db.collection("images")
                .doc(docRef.id)
                .update({
                  id: docRef.id,
                });
    
              const fileRef = `/images/${payload.id}/${newImage.name}`;
    
              firebase
                .storage()
                .ref(fileRef)
                .put(image)
                .then(() => {
                  firebase
                    .storage()
                    .ref(fileRef)
                    .getDownloadURL()
                    .then((url) => {
                      db.collection("images")
                        .doc(docRef.id)
                        .update({
                          url: url,
                        });
                    });
                });
            });
        });
        await context.dispatch('LOAD_IMAGES', { id: payload.id });

      }
}


export const images = {
    state,
    getters,
    mutations,
    actions
}

