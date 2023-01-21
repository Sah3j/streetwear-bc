import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    updateEmail,
    updatePassword
} from "firebase/auth";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase"




const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function googleSignIn(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    function updateDisplayName(name){
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            alert('Profile Updated');
          }).catch((error) => {
            alert(error);
          });
    }

    function updateUserEmail(email){
        updateEmail(auth.currentUser, email).then(() => {
            alert('Email Updated');
          }).catch((error) => {
            alert(error);
          });
    }

    function updateUserPassword(password){
        updatePassword(user, password).then(() => {
            alert("Password Updated")
          }).catch((error) => {
            alert(error)
          });
    }

    async function updateProfilePicture(file, setLoading){
        const oldFileRef = ref(storage, user.uid + '.png');

        setLoading(true);

        // Delete the file
        deleteObject(oldFileRef).then(() => {
          alert("file deleted");
        }).catch((error) => {
          alert(error);
        });

        const newFileRef = ref(storage, user.uid + '.png');

        const snapshot = await uploadBytes(newFileRef, file);
        const photoURL = await getDownloadURL(newFileRef);

        await updateProfile(user, {photoURL});
        setLoading(false);
        alert("profile picture updated!");
    }

    //storage functions
    async function upload(file, setLoading, displayName){
        const fileRef = ref(storage, user.uid + '.png');

        setLoading(true);

        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        await updateProfile(user, {photoURL, displayName});

        setLoading(false);
    }

    //post functions
    async function addNewPost(file, title, description, location, price){
      const timestamp = new Date().toISOString();
      const fileRef = ref(storage, timestamp + '.png');
      const snapshot = await uploadBytes(fileRef, file);
      const productPhotoURL = await getDownloadURL(fileRef);

      try {
        const docRef = await addDoc(collection(db, "posts"), {
          userID: user.uid,
          userName: user.displayName,
          userPhoto: user.photoURL,
          productPhoto: productPhotoURL,
          description: description,
          title: title,
          location: location,
          price: price,
          timestamp: timestamp
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    async function deletePost(id, photoName){
      const oldFileRef = ref(storage, photoName + '.png');

      // Delete the file
      deleteObject(oldFileRef).then(() => {
        console.log("file deleted")
      }).catch((error) => {
        alert(error);
      });

      await deleteDoc(doc(db, "posts", id))
      .then(() => {
        console.log("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error removing post: ", error);
      });
    }

    return <userAuthContext.Provider value={{ user, signUp,  logIn, logout, googleSignIn, updateDisplayName, updateUserEmail, updateUserPassword, upload, updateProfilePicture, addNewPost, deletePost }}>{children}</userAuthContext.Provider>
}

export function useUserAuth() {
    return useContext(userAuthContext); 
}