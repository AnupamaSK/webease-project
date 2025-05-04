// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyAOhUW5JuZknYI0VxNbVpO8V1MX-3-kX3M",
    authDomain: "webease-b425e.firebaseapp.com",
    projectId: "webease-b425e",
    storageBucket: "webease-b425e.appspot.com",
    messagingSenderId: "948088248126",
    appId: "1:948088248126:web:0f59cb86e964785916be6f",
    measurementId: "G-5D3L4JBD1R"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }