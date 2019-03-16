import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import { TrainingSevice } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining=false;
  exerciseSubscription:Subscription;

  constructor(private trainingService:TrainingSevice) { }

  ngOnInit() {
    this.exerciseSubscription=this.trainingService.exercisechanged.subscribe(exercise=>{
      if(exercise){
        this,this.ongoingTraining=true;
      }else{
      this.ongoingTraining=false;
      }
    });
  }

}
