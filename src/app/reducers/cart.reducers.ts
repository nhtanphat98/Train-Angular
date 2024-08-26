import { createReducer, on } from '@ngrx/store';
import {
    addToCart,
    clearCart,
    loadCart,
    removeFromCart,
    saveCartToLocalStorage,
    updateQuantity,
} from '../shopping-cart/cart-store/cart.actions';
import { Product } from '../../type';  

export const initialState: Product[] = [];
export const cartReducer = createReducer(
    initialState,
    on(loadCart, (state, { cart }) => [...cart]),
    on(addToCart, (state, { product }) => {
        const updatedCart = [...state, product];
        saveCartToLocalStorage(updatedCart); // Save to LocalStorage
        return updatedCart;
    }),
    on(removeFromCart, (state, { productId }) => {
        const updateCart = state.filter((item) => item.id !== productId);
        saveCartToLocalStorage(updateCart);
        return updateCart;
    }),
    on(clearCart, (state) => (state = [])),
    on(updateQuantity, (state, { productId, quantity }) => {

        const updateCart = state.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );
        saveCartToLocalStorage(updateCart);
        return updateCart;
    })
);

export function loadCartFromLocalStorage(): Product[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
}
