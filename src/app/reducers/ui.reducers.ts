

import * as UIActions from '../actions/ui.actions';

export interface State {
    isLoading:boolean;
}

const initialState: State ={
    isLoading:false
}

export function appReducer(state =initialState,action:UIActions.UIActions){
    switch(action.type){
        case UIActions.START_LOADING:
           
            return{
                isLoading:true
            }

            
        case UIActions.STOP_LOADING:
           
            return{
                isLoading:false
            }
        default:
            return state;
    }
}

export const getIsLoading = (state:State) => state.isLoading;