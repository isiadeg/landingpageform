import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './materialmodule/materialmodule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UsersComponent } from './users/users.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { HeadersectionComponent } from './headersection/headersection.component';
import { DialogComponent } from './dialog/dialog.component';
import { ServicesComponent } from './services/services.component';
import { ServicedialogComponent } from './servicedialog/servicedialog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WhyusComponent } from './whyus/whyus.component';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactdialogComponent } from './contactdialog/contactdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PagenotfoundComponent,
    UsersComponent,
    HeadersectionComponent,
    DialogComponent,
    ServicesComponent,
    ServicedialogComponent,
    LoginComponent,
    RegisterComponent,
    WhyusComponent,
    ContactformComponent,
    ContactdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
