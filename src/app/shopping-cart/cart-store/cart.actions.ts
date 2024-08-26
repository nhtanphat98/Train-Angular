import { createAction, props } from '@ngrx/store';
import { Product } from '../../../type';

export const loadCart = createAction(
    '[Cart] Load Cart',
    props<{ cart: Product[] }>()
);

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ product: Product }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ productId: number }>()
);

export const updateQuantity = createAction(
    '[Cart] Update Quantity From Cart',
    props<{ productId: number, quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export function saveCartToLocalStorage(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
