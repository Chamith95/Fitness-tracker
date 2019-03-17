import {Subject} from 'rxjs'
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Injectable()
export class TrainingSevice {
    exercisechanged=new Subject<Exercise>();
    ExercisesChanged=new Subject<Exercise[]>();
    finishedExercisesChanged=new Subject<Exercise[]>();

    private availableExercises:Exercise[]=[];
    private fbSubs:Subscription[]=[]; 

    private runningExercise:Exercise;
    private exercises:Exercise[]=[];


    constructor(private db:AngularFirestore ){}

    fetchAvailableExercises(){
        this.fbSubs.push(this.db.collection('availableExercises')
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
    .subscribe((exercises:Exercise[])=>{
        this.availableExercises=exercises;
        this.ExercisesChanged.next([...this.availableExercises]);
    }));
    }

    startExercise(selectedId:string) {
        const selectedExercise=this.availableExercises.find(ex=>ex.id===selectedId)
        this.runningExercise=selectedExercise;

        this.exercisechanged.next({...this.runningExercise})
    }

    getRunningExercies(){
        return{...this.runningExercise}
    }

    completeExercise(){
        this.addDataToDatabase({...this.runningExercise, date : new Date(),state:'completed'});
        this.runningExercise=null;
        this.exercisechanged.next(null);
    }

    cancelExercise(progress:number){
        this.addDataToDatabase({...this.runningExercise,duration:this.runningExercise.duration *(progress/100),calories:this.runningExercise.calories *(progress/100) ,date : new Date(),state:'cancelled'});
        this.runningExercise=null;
        this.exercisechanged.next(null);
    }

    fetchCompletedOrCancelledExercises(){
      this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().
       subscribe((exercises:Exercise[]) => {
           this.finishedExercisesChanged.next(exercises);
       }));
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(sub=>sub.unsubscribe());
    }

    private addDataToDatabase(exercise:Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}