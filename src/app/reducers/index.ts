import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { cartReducer } from './cart.reducers';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
  cart: cartReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
