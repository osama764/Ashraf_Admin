const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAKTof0tllNs6Jqniou9zaq8baJrJXBCoM",
  authDomain: "ashraf-27e6b.firebaseapp.com",
  projectId: "ashraf-27e6b",
  storageBucket: "ashraf-27e6b.appspot.com",
  messagingSenderId: "14595756122",
  appId: "1:14595756122:web:99e3ba2344567f9ff84863"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

module.exports = {
  firebase,
  db: database,
};
