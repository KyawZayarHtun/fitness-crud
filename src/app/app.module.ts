import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CreateRegistrationComponent
} from './components/create-registration/create-registration.component';
import {
  RegistrationListComponent
} from './components/registration-list/registration-list.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {NgToastModule} from "ng-angular-popup";
import {NgConfirmModule} from "ng-confirm-box";
import {MaterialDesignModule} from "./material-design/material-design.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatLineModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    CreateRegistrationComponent,
    RegistrationListComponent,
    UserDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgToastModule,
        NgConfirmModule,
        MaterialDesignModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatLineModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
