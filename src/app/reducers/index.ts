import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


import * as fromApp from './ui.reducers';

export interface State {
  ui: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromApp.appReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getUiState=createFeatureSelector<fromApp.State>('ui');
export const getIsLoading =createSelector(getUiState,fromApp.getIsLoading);