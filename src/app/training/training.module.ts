import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { trainingRoutingModule } from './training-routing.module';
import {StoreModule, Store} from '@ngrx/store'
import { trainingReducer } from '../reducers/training.reducer'

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        ],
    imports:[
        CommonModule,
        SharedModule,
        trainingRoutingModule,
        StoreModule.forFeature('training',trainingReducer)
    ],
    exports:[]
})
export class TrainingModule {}