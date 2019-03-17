import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingSevice } from '../training.service';
import { Exercise } from '../exercise.model';
import {NgForm} from '@angular/forms'
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  exercises:Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService:TrainingSevice) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.ExercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }
}
