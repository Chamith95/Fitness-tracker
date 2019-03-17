import {Subject} from 'rxjs';
import {Injectable} from '@angular/core'
import {User} from './user.model'
import {Authdata} from './auth-data.model'
import {Router} from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingSevice } from '../training/training.service';


@Injectable()
export class AuthService{
    authChange =new Subject<boolean>();
    private isAuthenticated=false;
    constructor(private router:Router,private afauth:AngularFireAuth,private trainingService:TrainingSevice){

    }

    initAuthListner(){
        this.afauth.authState.subscribe(user=>{
            if(user){
                this.isAuthenticated=true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false); 
                this.router.navigate(['/login']);
                this.isAuthenticated=false;
            }
        })
    }

    registerUser(authData: Authdata){
            this.afauth.auth.createUserWithEmailAndPassword(
                authData.email,
                authData.password).then(result=>{
                    console.log(result)

                })
                .catch(error=>{
                    console.log(error);
                });

    }

    login(authData:Authdata){
        this.afauth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password).then(result=>{
                console.log(result)

            })
            .catch(error=>{
                console.log(error);
            });
    }
    

    logout(){
        this.afauth.auth.signOut();

    }

    isAuth(){
        return this.isAuthenticated;
    }


}