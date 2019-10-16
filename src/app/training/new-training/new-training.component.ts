import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingSevice } from '../training.service';
import { Exercise } from '../exercise.model';
import {NgForm} from '@angular/forms'
import {Subscription} from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  isLoading=false;
  isLoadingSub:Subscription
  exercises:Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService:TrainingSevice,private uiService:UiService) { }

  ngOnInit() {
    this.isLoadingSub=this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    })
    this.exerciseSubscription = this.trainingService.ExercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
  
      this.FetchExercises();
  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise)
  }

  FetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }
  
  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }
}
