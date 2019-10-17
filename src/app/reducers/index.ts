import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


import * as fromUI from './ui.reducers';
import * as fromAuth from './auth.reducer'

export interface State {
  ui: fromUI.State;
  auth:fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.appReducer,
  auth:fromAuth.authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState =createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth =createSelector(getAuthState,fromAuth.getIsAuth)