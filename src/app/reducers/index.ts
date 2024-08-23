import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { cartReducer } from './cart.reducers';
import { Product } from '../../type';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
  cart: cartReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
