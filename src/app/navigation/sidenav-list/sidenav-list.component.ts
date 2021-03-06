import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {Subscription, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,OnDestroy {
  @Output() closeSidenav=new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription:Subscription;

  constructor(private authService:AuthService,private store:Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$=this.store.select(fromRoot.getIsAuth);
  }


  OnClose(){
    this.closeSidenav.emit();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.OnClose();
    this.authService.logout();
  }
}
