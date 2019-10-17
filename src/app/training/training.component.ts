import { Component, OnInit } from '@angular/core';
import {Subscription, Observable} from 'rxjs'
import { TrainingSevice } from './training.service';
import { Store } from '@ngrx/store'
import * as fromTraining from '../reducers/training.reducer'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$:Observable<boolean>;


  constructor(private trainingService:TrainingSevice,private store:Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ =this.store.select(fromTraining.getIsTraining);
  }

}
