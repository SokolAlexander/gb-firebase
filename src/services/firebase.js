import firebase from "firebase";

const config = {
  // removed
  apiKey: "",
  authDomain: "",
  databaseURL: "",
};
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();

export function signup(email, password) {
  console.log(email, password);
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}