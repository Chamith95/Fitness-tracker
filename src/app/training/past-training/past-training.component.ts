import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TrainingSevice } from '../training.service';
import {Subscription, from} from 'rxjs'; 
import {Store} from '@ngrx/store'
import * as fromTraining from '../../reducers/training.reducer'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit {
  displayedColumns=['date','name','duration','calories','state'];
  dataSource =new MatTableDataSource<Exercise>();
  private exchangedsubscription:Subscription;

  @ViewChild(MatSort) sort:MatSort; 
  @ViewChild(MatPaginator) paginator:MatPaginator; 
  constructor(private trainingService:TrainingSevice,
              private Store:Store<fromTraining.State>) { }

  ngOnInit() {
    this.Store.select(fromTraining.getFinishedExercises).subscribe((exercises:Exercise[])=>{
      this.dataSource.data=exercises; 
    })
   this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  doFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }


}
