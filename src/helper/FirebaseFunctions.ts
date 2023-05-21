import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { Item } from "../models/types";


const usersLogin: string = localStorage.getItem("login") as string;
export const wardrobeCollectionRef = collection(db, usersLogin);

//РОБОТА З FIREBASE

export function deleteItem(itemId: string) {
  const item = doc(wardrobeCollectionRef, itemId);
  deleteDoc(item);
}

export function addNewItem(newItem: Item) {
  addDoc(wardrobeCollectionRef, {
    name: newItem.name,
    color: newItem.color,
    size: newItem.size,
    purpose: newItem.purpose,
    picture: newItem.picture,
  });
}

export function editItem(itemId: string, newItem: Item) {
  const item = doc(wardrobeCollectionRef, itemId);
  updateDoc(item, {
    name: newItem.name,
    color: newItem.color,
    size: newItem.size,
    purpose: newItem.purpose,
    picture: newItem.picture
  });
}
