import {createContext} from 'react';
import {initializeApp} from 'firebase/app'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCMgmUpyFVBgPlaTrcCOzry2qyyPEnCcWE",
  authDomain: "easycycle-9d5fc.firebaseapp.com",
  projectId: "easycycle-9d5fc",
  storageBucket: "easycycle-9d5fc.firebasestorage.app",
  messagingSenderId: "554442579994",
  appId: "1:554442579994:web:d63df983b1ee70423471a3"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const db=getFirestore(app);

export const FirebaseContext=createContext(null);

export const FirebaseProvider=(props)=>{

  const signIn=()=>{
    return signInWithPopup(auth,googleProvider)
    .then(async (result)=>{
      const user=result.user;
      const token=await user.getIdToken();

      const credential=GoogleAuthProvider.credentialFromResult(result);
      const googleAccessToken=credential.accessToken;

      localStorage.setItem("user",JSON.stringify({
        name:user.displayName,
        email:user.email,
        photoURL:user.photoURL,
        token:token,
        googleAccessToken:googleAccessToken
      }));

      console.log("User info saved to local storage");
      return user;
    })
    .catch((err)=>{
      console.log("Sign in failed");
      throw err;
    })
  }

  return(
    <FirebaseContext.Provider value={{signIn, auth, db}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}