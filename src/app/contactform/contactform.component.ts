import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';
import {FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators} from '@angular/forms'

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
import { Console } from 'console';
import { debounceTime } from 'rxjs/operators';
import { set, ref as ref2, getDatabase } from 'firebase/database';
import { LoginService } from '../login.service';

const storage = getStorage();
const db = getDatabase();
// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'


@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['../services/services.component.css']
})
export class  ContactformComponent implements OnInit {

  public Editor = DecoupledEditor;
  @Input() expand = false;
  @Input() data:any;
  public onReady( editor:any ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
        return new MyUploadAdapter( loader );
    };
  }
  

  landingPageForm: FormGroup = new FormGroup({});
  activateOverlay:boolean = false;
  dialogref!:MatDialogRef<any>;
    
  alertMessage:string = "";
  typeOfMessage:string ="";
  questionanswered:boolean = false;
  pageyes:boolean = false;
  hint:{[key:string]: boolean} ={
    facebook:false,

  } 
  


  //eachsection: FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private dialog:MatDialog, private loginservice:LoginService) { }

  ngOnInit(): void {
    this.landingPageForm = this.fb.group({

      ceoName: '',
      businessPhonenumber:'',
      businessEmail:['', [Validators.email]],
      facebookPageUrl:'',
      businessWhatsapp:'',
      twitterUrl:'',
      linkedinUrl:'',
      instagramUrl:'',
      businessAddress:'',
      businessOpenHours:''
      
    })
    if(this.data){
      
     
  
        this.data.services.forEach((e:any, index:any)=>{
          

          if(index == 0){

            
            
            
            

          }else{
            

          }
        })
              
this.landingPageForm.updateValueAndValidity();
    }
    console.log(this.landingPageForm.value);
  
  this.landingPageForm.valueChanges.pipe(debounceTime(4000)).subscribe((e:any)=>{
    set(ref2(db,'users/'+this.loginservice.user+"/"+'contact'), {
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
        if(e === "serviceImageUrl"){
          dummygroup.addControl(e, new FormArray([this.createFormgroup(['eachimage'])]))
        }   else{
        console.log(e);
        dummygroup.addControl(e, new FormControl(''));}
      })
      return dummygroup;
      console.log(dummygroup);
      
  }

  addServices(){
    

  }


onChange( { editor }: ChangeEvent, i:number ) {
  const data = editor.getData();

  

}
answer(what:string){
  this.questionanswered = true;
  this.pageyes = true;
}


save(){
  console.log(this.landingPageForm.value);
  console.log({...this.landingPageForm.value});
  set(ref2(db,'users/'+this.loginservice.user+"/"+'contact'), {
    ...this.landingPageForm.value, 

  }).then(()=>{
    this.activateOverlay = true;
    this.alertMessage = "Your Services/Product Information has been saved Successfully"
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
showhint(what:any){
  this.activateOverlay = true;
  
  this.hint[what] = true;
}
closehint(what:any){
  this.activateOverlay = false;
  this.hint[what] = false;
}
closeMessage(){
  this.alertMessage = "";
  this.activateOverlay = false;
}
opendialog(){
    this.dialogref= this.dialog.open(ServiceDialogComp, {data:{
      bigsrc: "https://firebasestorage.googleapis.com/v0/b/functions-landingpage.appspot.com/o/images%2Ffunctionscollege.web.app_(big%20laptop)%20(2).png?alt=media&token=0961e02a-682a-41c5-a2fa-0225af1ea92f",
      smallsrc: "https://firebasestorage.googleapis.com/v0/b/functions-landingpage.appspot.com/o/images%2Ffunctionscollege.web.app_(iPhone%20SE)%20(1).png?alt=media&token=9dfccdd4-cf7b-4d01-bb5e-0f94c7db193b",
    }})
}

}

@Component({
  templateUrl: '../contactdialog/contactdialog.component.html',
  styleUrls:['../contactdialog/contactdialog.component.css']
})
export class ServiceDialogComp{
  constructor(@Inject (MAT_DIALOG_DATA) public data: {bigsrc:string, smallsrc:string} , 
  private dialog:MatDialogRef<{[key:string]:string}>){}
  close(){
    this.dialog.close('hi');
  }
} 