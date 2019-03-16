import { Component, OnInit } from '@angular/core';
import { TrainingSevice } from '../training.service';
import { Exercise } from '../exercise.model';
import {NgForm} from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'; 


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises:Observable<Exercise []>;

  constructor(private trainingService:TrainingSevice,private db:AngularFirestore) { }

  ngOnInit() {
 this.exercises=this.db.collection('availableExercises')
   .snapshotChanges()
   .pipe(map(docArray=>{
    return docArray.map(doc=>{
      const data = doc.payload.doc.data() as Exercise;
      const id = doc.payload.doc.id;
       return{
       id,...data,
       }
     })
   }))

  }

  onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise)
  }
}
