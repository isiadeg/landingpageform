import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
showornot:boolean  =false;
errors:{[key:string]: any[]} = {

}
errorMessage:{[key:string]: any}={
  required : 'This Field is Required',
  email: 'Please enter a correct email address'
}
overlay:boolean = false;
errordiv:boolean = false;
registerForm :FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private loginservice:LoginService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

    //let email= 
    
      this.registerForm.get('email')!.valueChanges.pipe(debounceTime(2000)).subscribe((f:any)=>{
        this.seterror(this.registerForm.get('email'), 'email');
     
      })
  }

  seterror(c:any, controlname:string){
    this.errors[controlname] = [];

      if((c!.touched || c!.dirty) && c!.errors){
        this.errors[controlname] = Object.keys(c!.errors).map((e:string)=>{
          console.log(this.errorMessage[e])
          return this.errorMessage[e];
        })
      }
      console.log(this.errors);
  }


  toggleShow(){
    this.showornot = !this.showornot;
  }
  register(){
    if(!this.registerForm.valid){
      this.showsubmiterror(); 
    }else{
      this.loginservice.register(this.registerForm.value.email,
        this.registerForm.value.password )
    }
  }
  showsubmiterror(){
    this.overlay = true;
    this.errordiv = true;
  }
  closesubmiterror(){
    this.overlay=false;
    this.errordiv = false;
  }
}
