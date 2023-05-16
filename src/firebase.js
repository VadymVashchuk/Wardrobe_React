import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBff2atZstK10HmZEp6VjyfJwXWtBWqwGU",
  authDomain: "wardrobe-react.firebaseapp.com",
  projectId: "wardrobe-react",
  storageBucket: "wardrobe-react.appspot.com",
  messagingSenderId: "459686213036",
  appId: "1:459686213036:web:6f741243ba80badc6a7609"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();