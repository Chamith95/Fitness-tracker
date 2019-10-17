import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingSevice } from '../training.service';
import { Exercise } from '../exercise.model';
import {NgForm} from '@angular/forms'
import {Subscription, Observable} from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import * as fromTraining from '../../reducers/training.reducer'
import * as Ui from '../../actions/ui.actions'
import * as Training from '../../actions/training.actions'
import * as fromRoot from '../../reducers/index'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  isLoading=false;
  isLoadingSub:Subscription
  exercises$:Observable<Exercise[]>;
  exerciseSubscription: Subscription;

  constructor(private trainingService:TrainingSevice,private uiService:UiService,private store:Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoadingSub=this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading
    })
    this.exercises$=this.store.select(fromTraining.getavailableExercises);
    this.FetchExercises();
      // this.exercises$=this.store.select(fromTraining.getavailableExercises);


  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise)
  }

  FetchExercises(){
    this.trainingService.fetchAvailableExercises();

  }
  

}
