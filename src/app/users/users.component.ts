import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName } from '@angular/forms';
import {Route, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  nameForm:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.nameForm = this.fb.group({
      name:'',
    })
  }

  navigate(){
    this.router.navigate(['user', this.nameForm.value.name])
  }
}
