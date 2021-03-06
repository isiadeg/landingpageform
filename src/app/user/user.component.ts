import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';
import {FormBuilder, FormGroup, FormArray, FormControl, AbstractControl} from '@angular/forms'
import { LoginService } from '../login.service';

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
import { ActivatedRoute } from '@angular/router';


const storage = getStorage();
const db=getDatabase();
const auth = getAuth()



// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public Editor = DecoupledEditor;

  public onReady( editor:any ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
        return new MyUploadAdapter( loader );
    };
  }
  

  progressbar:{[key:string]:any} ={};
  progressmode:{[key:string]:ProgressBarMode} = {};
  progressvalue:{[key:string]:number}={};
  successfulUpload:{[key:string]:boolean} = {};
  landingPageForm: FormGroup = new FormGroup({});
   

  trueorfalse:{[key:string]:boolean} ={
    header:false,
    services:false,
    whyus:false
  } 
  lastsaved:any= "";
  forms:any[]=[
    {name:'header', lastsaved:''},
    {name: 'services', lastsaved:''},
    {name: 'whyus', lastsaved:''}

  ]
  lastsavedforeach:any = {}
  lastsavedforeachi:any = {}
  changedval:any = {}
  data!:any

  get sections():FormArray{
    return<FormArray>this.landingPageForm.get('headerImages');
  }
  //eachsection: FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private loginService:LoginService, 
    private route: ActivatedRoute) { 
    

let ref1 = ref2(db, "users/"+this.loginService.user+"/header" ); 
let reftwo = ref2(db, "users/"+this.loginService.user+"/services" );
let refthree = ref2(db, "users/"+this.loginService.user+"/whyus")

    onValue((ref1), (snapshot)=>{
      if(this.changedval['header']){ 
      
      this.lastsavedforeachi['header'] = new Date().getTime();
      this.lastsaved = 0;
      console.log(snapshot.val());}else{
        this.changedval['header'] = snapshot.val();
        console.log(this.changedval['header']);
      }

    })
    onValue((reftwo), (snapshot)=>{
      if(this.changedval['services']){ 
      console.log(snapshot.val())
      this.lastsavedforeachi['services'] = new Date().getTime();
      this.lastsaved = 0;
      console.log(snapshot.val);
    }else{
      this.changedval['services'] = snapshot.val()
    }


    })
    
    onValue((refthree), (snapshot)=>{
      if(this.changedval['whyus']){ 
      console.log(snapshot.val())
      this.lastsavedforeachi['whyus'] = new Date().getTime();
      this.lastsaved = 0;
      //console.log(snapshot.val);
      }else{
      this.changedval['whyus'] = snapshot.val()
      }

    })
  }

  ngOnInit(): void {
    this.landingPageForm = this.fb.group({
      businessName : '',
      logoUrl: '',
      headerImages: this.fb.array([this.createFormgroup(['headerImage'])])
    })

    let data = this.route.snapshot.data['forms'];
    console.log(data);
    if(data == null){

    }
    else if(data.Error){
      alert("An error occured, Check Your Network Connection")
    }else{
      this.data = data;
      console.log(this.data);
    }

    setInterval(()=>{
      if(this.lastsavedforeachi['header']){
      this.lastsavedforeach['header'] = Math.round((new Date().getTime() - this.lastsavedforeachi['header'])/1000)
      console.log(new Date().getTime());
      console.log(this.lastsavedforeach['header'])
      this.lastsaved = this.lastsavedforeach['header'];
    }}, 1000)

    setInterval(()=>{

      if(this.lastsavedforeachi['services']){
      this.lastsavedforeach['services'] = Math.round((new Date().getTime() - this.lastsavedforeachi['services'])/1000)
      //console.log(new Date().getTime());
      //console.log(this.lastsavedforeach['header'])
      this.lastsaved = this.lastsavedforeach['services'];
    }}, 1000)

    
    setInterval(()=>{
      if(this.lastsavedforeachi['whyus']){
      this.lastsavedforeach['whyus'] = Math.round((new Date().getTime() - this.lastsavedforeachi['whyus'])/1000)
      //console.log(new Date().getTime());
      //console.log(this.lastsavedforeach['header'])
      this.lastsaved = this.lastsavedforeach['whyus'];
    }}, 1000)
  }

  eachsection():FormGroup{
    return this.fb.group({
      
      sectionTitle: '',
    
    })
  }
  createFormgroup(name:any[]){
      let dummygroup = this.fb.group({});
      name.forEach(e=>{

        dummygroup.addControl(e, new FormControl());
      })
      
  }


  upload(id:string, multipleornot:string, c:AbstractControl,
    whichprogress:string, controlname:string, d?:FormArray ){
    this.progressbar[whichprogress] = true;
    this.successfulUpload[whichprogress] = false;
    let files = document.getElementById(id)!.
    getElementsByTagName('input')[0]!.files || undefined;
    if(files){
    for(let i = 0; i<files.length; i++){
      let file = files[i];
    const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    this.progressmode[whichprogress] = "determinate";
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.progressvalue[whichprogress] = progress;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        alert("upload cancelled");
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        alert("Unknown Error Occured, Might Be Due To Network")
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    this.progressbar[whichprogress] = false;
    this.successfulUpload[whichprogress] = true;
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(multipleornot != "multple"){
       // whichone.push(downloadURL)
        this.landingPageForm!.get(controlname)!.setValue(downloadURL);
      }else{
       // whichone.push(downloadURL);
        if(d!.controls[0]!.get(controlname)!.value === null){
          d!.controls[0]!.get(controlname)!.setValue(downloadURL)
        }else{
          let toadd = this.fb.group({});
          toadd!.addControl(controlname, new FormControl())
          toadd!.get(controlname)!.setValue(downloadURL);

          d!.push(toadd);
          console.log(toadd);
          console.log(d!);
         // console.log(whichone);
        }
      }




    });
  }
);


  }
}
}

onChange( { editor }: ChangeEvent ) {
  const data = editor.getData();

  console.log( data );
}
expanded(what:string){
  
  for(let water in this.trueorfalse){
    this.trueorfalse[water]= false;
    
  }
  this.trueorfalse[what]= true;

  console.log(this.trueorfalse)

}

logout(){
  this.loginService.logout();

}
rounddown(number:number):number{
  return Math.floor(number);
}

}
