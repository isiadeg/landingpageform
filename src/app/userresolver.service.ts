import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDARsAFKedTVvdKfc1AKprZfobuugRSgPY",
  authDomain: "functions-landingpage.firebaseapp.com",
  projectId: "functions-landingpage",
  storageBucket: "functions-landingpage.appspot.com",
  messagingSenderId: "99101099763",
  appId: "1:99101099763:web:fbc2a278cbed6a0f2ad986",
  measurementId: "G-GHSZT7KFMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getDatabase, ref as ref2, set, onValue, get} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


const storage = getStorage();
const db=getDatabase();
const auth = getAuth()




@Injectable({
  providedIn: 'root'
})
export class UserresolverService implements Resolve<any>{

  constructor(private login:LoginService) { }

  async resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Promise<any>{
    console.log("in resolver")
    try {let snapshot  = await get(ref2(db, 'users/'+this.login.user))
    if(snapshot.exists()){
      return snapshot.val()
   }else{
     return null;
   }
  }catch(e){
    alert(e);
    this.login.logout();
    }
  
  }
}
