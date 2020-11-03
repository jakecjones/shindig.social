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

const actions = {
    LOAD_IMAGES(context, payload) {
        db.collection("images").where("productId", "==", payload.id)
        .onSnapshot(function(querySnapshot) {
            const images = []
            querySnapshot.forEach(function(doc) {
                images.push(doc.data())
            });
            return images;
        });
    },
    async ADD_IMAGES(context, payload) {
        context;
        payload.images.forEach(image => {
            const newImage = {};
            newImage.createdAt = new Date();
            newImage.name = image.name;
            newImage.size = image.size;
            newImage.type = image.type;
            newImage.productId = payload.id;
    
          db.collection("images")
            .add(newImage)
            .then((docRef) => {
              db.collection("images")
                .doc(docRef.id)
                .update({
                  id: docRef.id,
                });
    
              const fileRef = `/images/${payload.id}/${
                docRef.id
              }.${newImage.name.split(".").pop()}`;
    
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
    mutations,
    actions,
    getters
}

