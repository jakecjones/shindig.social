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


const actions = {

    CREATE_SUBMISSION(context, payload) {
        context;
        const createdAt = new Date();
        
        db.collection("submissions").add(payload)
        .then((docRef) => {
          return db.collection("submissions").doc(docRef.id)
            .update({
                id: docRef.id,
                createdAt: createdAt
            })
        })
    }

}

export const form = {
    actions
}