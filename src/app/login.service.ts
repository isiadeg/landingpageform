import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword,
signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {Router} from '@angular/router'
import { Console } from 'console';

const auth = getAuth();
let userUid:any = null;



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error?:string;
  user:any = userUid;
  url?:string
  constructor(private router:Router) { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        userUid = uid;
        this.user = uid;
        // ...
        console.log(uid);
        if(this.url){
          this.router.navigate([this.url]);
        }else{
          this.router.navigate(['/user', userUid])
        }
      
    
      } else {
        // User is signed out
        // ...
        userUid = null;
        this.user = userUid;
        this.router.navigate(['/login'])
      }
    });


  }
  isLoggedIn(){
    if(userUid !== null){
      return true;

    }else{
      return false;
    }
  }

  register(email:string, password:string){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(userUid)
      this.router.navigate(['/user', userUid])
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.error = error.message;
      // ..
    });
  }
  signin(email:string, password:string){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user; 
    console.log(userUid)
    //this.router.navigate(['/user', userUid])

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    this.error = error.message;
  });
  }
  logout(){
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      this.error = error.message;
      this.router.navigate(['/login']);
    });
  }
}
