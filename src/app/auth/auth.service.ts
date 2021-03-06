import {Subject} from 'rxjs';
import {Injectable} from '@angular/core'
import {User} from './user.model'
import {Authdata} from './auth-data.model'
import {Router} from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingSevice } from '../training/training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index'
import * as Ui from '../actions/ui.actions'
import * as Auth from '../actions/auth.actions'
import { UiService } from '../shared/ui.service';


@Injectable()
export class AuthService{
    authChange =new Subject<boolean>();

    constructor(private router:Router,
        private store : Store <fromRoot.State>,
        private uiService:UiService,
        private afauth:AngularFireAuth,private trainingService:TrainingSevice){

    }

    initAuthListner(){
        this.afauth.authState.subscribe(user=>{
            if(user){
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Auth.SetUnAuthenticated());
                this.router.navigate(['/login']);
        
            }
        })
    }

    registerUser(authData: Authdata){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new Ui.StartLoading())
            this.afauth.auth.createUserWithEmailAndPassword(
                authData.email,
                authData.password).then(result=>{
                    // this.uiService.loadingStateChanged.next(false)
                    this.store.dispatch(new Ui.StopLoading())
                })
                .catch(error=>{
                    this.store.dispatch(new Ui.StopLoading())
                    this.uiService.showSnackbar(error.message,null,3000)
                });

    }

    login(authData:Authdata){
        this.store.dispatch(new Ui.StartLoading())
        this.afauth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password).then(result=>{
                this.store.dispatch(new Ui.StopLoading())
                // this.uiService.loadingStateChanged.next(false)
            })
            .catch(error=>{
                this.store.dispatch(new Ui.StopLoading())
                this.uiService.showSnackbar(error.message,null,3000)
            });
    }
    

    logout(){
        this.afauth.auth.signOut();

    }




}