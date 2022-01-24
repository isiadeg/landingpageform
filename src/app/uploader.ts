import {ServeuploadService} from './serveupload.service';
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

const storage = getStorage();

// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'



export class MyUploadAdapter {
    loader:any;
    constructor( loader:any) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        
    }
        
    // Starts the upload process.
    upload() {
        
        // Return a promise that will be resolved when the file is uploaded.
        return this.loader.file
            .then( (file:any) => {
        // Update the loader's progress.
        return new Promise((resolve, reject)=>{
            console.log(file.name)
        const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    //this.progressmode = "determinate";
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //this.progressvalue = progress;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
    this.loader.uploadTotal = progress;

  }  , 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    this.abort(error);
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     console.log(downloadURL);
     
        resolve({default:downloadURL});
    });
  }) })
});

    }

    // Aborts the upload process.
    abort(error:any) {
        console.log(error.code)
        // Reject the promise returned from the upload() method.
        return error.code;

    }
}

