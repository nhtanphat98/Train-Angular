import { createReducer, on } from "@ngrx/store";
import { addToCart, clearCart, removeFromCart, updateQuantity } from "../shopping-cart/cart-store/cart.actions";
import { Product } from "../../type";

export const initialState: Product[] = []
export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => ({
        ...state,
        items: [...state, product]
    })),
    on(removeFromCart, (state, { productId }) => ({
        ...state,
        items: state.filter(item => item.id !== productId)
    })),
    on(clearCart, state => ({
        ...state,
        items: []
    })),
    on(updateQuantity, (state, {productId, quantity}) => ({
        ...state,
        items: state.map(item =>
            item.id === productId
              ? { ...item, quantity } // Cập nhật số lượng sản phẩm
              : item
          )
    }))
);

