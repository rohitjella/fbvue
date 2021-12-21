import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC87so4wV74nq1P9eI1F7QPiR6W7hPGKps",
    authDomain: "vue-curd-app.firebaseapp.com",
    projectId: "vue-curd-app",
    storageBucket: "vue-curd-app.appspot.com",
    messagingSenderId: "898899219740",
    appId: "1:898899219740:web:cfea27662c2adc47d356d9"
};

firebase.initializeApp(firebaseConfig)

//utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

//collections
const usersCollection = db.collection('users')
const gamesCollection = db.collection('games')
const meetingsCollection = db.collection('meetings')

export {
    db, auth, storage, usersCollection, gamesCollection, meetingsCollection
}