import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent,],
    imports:[
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports:[]
})
export class AuthModule {}