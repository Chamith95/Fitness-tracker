import {Subject} from 'rxjs'
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../reducers/training.reducer'
import * as fromRoot from '../reducers/index'
import * as Ui from '../actions/ui.actions'
import * as Training from '../actions/training.actions'



@Injectable()
export class TrainingSevice {
    exercisechanged=new Subject<Exercise>();
    ExercisesChanged=new Subject<Exercise[]>();
    finishedExercisesChanged=new Subject<Exercise[]>();

    private availableExercises:Exercise[]=[];
    private fbSubs:Subscription[]=[]; 

    private runningExercise:Exercise;
    private exercises:Exercise[]=[];


    constructor(private db:AngularFirestore,
                private uiService:UiService,
                private store:Store<fromTraining.State>
                ){}

    fetchAvailableExercises(){
        this.uiService.loadingStateChanged.next(true);
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
        this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new Training.SetAvailbleTrainings(exercises));
        
    },error=>{
        this.uiService.loadingStateChanged.next(false)
        this.uiService.showSnackbar('Fetching Exercises failed,Please try again later',null,3000)
        this.ExercisesChanged.next(null);
    }));
    }

    startExercise(selectedId:string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }



    completeExercise(){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
            this.addDataToDatabase({...ex, date : new Date(),state:'completed'});
        })
      
        this.store.dispatch(new Training.StopTraining());
    }

    cancelExercise(progress:number){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
            this.addDataToDatabase({...ex,duration:ex.duration *(progress/100),
                                    calories:ex.calories *(progress/100) ,
                                    date : new Date(),state:'cancelled'
        });
        this.store.dispatch(new Training.StopTraining()); 
        })
      
       
    }

    fetchCompletedOrCancelledExercises(){
      this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().
       subscribe((exercises:Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
       }));
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(sub=>sub.unsubscribe());
    }

    private addDataToDatabase(exercise:Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}