import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';
import {FormBuilder, FormGroup, FormArray, FormControl, AbstractControl} from '@angular/forms'


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
import { NumberSymbol } from '@angular/common';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import {getDatabase, ref as ref2, set} from "firebase/database";
import { LoginService } from '../login.service';
const storage = getStorage();
const db =getDatabase();

// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'


@Component({
  selector: 'app-header',
  templateUrl: './headersection.component.html',
  styleUrls: ['./headersection.component.css']
})
export class HeadersectionComponent implements OnInit {

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
  show:{[key:string]: any[]}={'deleteDialog': []};
  activateOverlay:boolean = false;
  dialogref!:MatDialogRef<any>;
  @Input() expand = false;
  alertMessage:string = "";
  typeOfMessage:string ="";
   @Input() data:any;


  get sections():FormArray{
    return<FormArray>this.landingPageForm.get('headerImages');
  }
  //eachsection: FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private dialog:MatDialog,
    private loginservice:LoginService) { }

  ngOnInit(): void {
    this.landingPageForm = this.fb.group({
      businessName : '',
      logoUrl: '',
      headerImages: this.fb.array([this.createFormgroup(['headerImage'])])
    })
    if(this.data){
      console.log(this.data);
      this.landingPageForm.patchValue({
        businessName: this.data.businessName,
        logoUrl: this.data.logoUrl,
        
      })
      if(this.data.headerImages){
        this.data.headerImages.forEach((e:any, index:any)=>{
          if(index == 0){
            this.sections.controls[0].get('headerImage')!.setValue(e['headerImage']);
            
            

          }else{
            this.sections.push(this.fb.group({
              'headerImage': e['headerImage']
            }))

          }
        })
              }
this.landingPageForm.updateValueAndValidity();
    }
    this.landingPageForm.valueChanges.pipe(debounceTime(4000)).subscribe((e:any)=>{
      set(ref2(db,'users/'+this.loginservice.user+"/"+'header'), {
        ...this.landingPageForm.value
      }).then(()=>{
        console.log("data has been saved")
      }).catch(e=>{
        console.log(`An error occured in saving your form. Check your
        network`)
      })
    })
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
      return dummygroup;
      
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
      if(multipleornot != "multiple"){
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
          
          console.log(this.landingPageForm);
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

delete(d:FormArray, i:number, whatToHide:string, controlname:string){
  if(d!.controls.length === 1){
    d!.controls[0]!.get(controlname)!.setValue(null);
  }else{
 d.removeAt(i);}
 this.hide(whatToHide, i);
 console.log(this.landingPageForm.value.headerImages)
}
reveal(ele:string, i:number){

    this.show[ele]= [];
    this.show[ele][i] = true;

    console.log(this.show);
    this.activateOverlay = true;
}
hide(ele:string, i:number){
  this.show[ele][i] = false;
  this.activateOverlay = false;
}
save(){
  set(ref2(db,'users/'+this.loginservice.user+"/"+'header'), {
    ...this.landingPageForm.value
  }).then(()=>{
    this.activateOverlay = true;
    this.alertMessage = "Your Header Information has been saved Successfully"
    this.typeOfMessage = "success";
    console.log("data has been saved")
  }).catch(e=>{
    this.activateOverlay = true;
    this.alertMessage = `An error occured in saving your form. Check your
    network`
    this.typeOfMessage = "error";
    console.log(`An error occured in saving your form. Check your
    network`)
  })
}

closeMessage(){
  this.alertMessage = "";
  this.activateOverlay = false;
}

opendialog(){
    this.dialogref= this.dialog.open(DialogComp, {data:{
      bigsrc: "https://firebasestorage.googleapis.com/v0/b/functions-landingpage.appspot.com/o/images%2Ffunctionscollege.web.app_(big%20laptop)%20(2).png?alt=media&token=0961e02a-682a-41c5-a2fa-0225af1ea92f",
      smallsrc: "https://firebasestorage.googleapis.com/v0/b/functions-landingpage.appspot.com/o/images%2Ffunctionscollege.web.app_(iPhone%20SE)%20(1).png?alt=media&token=9dfccdd4-cf7b-4d01-bb5e-0f94c7db193b",
    }})
}

}


@Component({
  templateUrl: '../dialog/dialog.component.html',
  styleUrls:['../dialog/dialog.component.css']
})
export class DialogComp{
  constructor(@Inject (MAT_DIALOG_DATA) public data: {bigsrc:string, smallsrc:string} , 
  private dialog:MatDialogRef<{[key:string]:string}>){}
  close(){
    this.dialog.close('hi');
  }
} 