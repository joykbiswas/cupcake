import { useDispatch, useSelector } from 'react-redux';
import type {  RootState } from '../store';
import { addToCart, removeFromCart, clearCart } from '../store/slices/cartSlice';
import type {  Cake } from '../types/cake';
import { useToast } from './useToast';

export const useReduxCart = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state: RootState) => state.cart);
  const { showToast } = useToast();

  const handleAddToCart = (product: Cake) => {
    console.log("Redux addToCart", product);
    try {
      dispatch(addToCart(product));
      showToast('Product added to cart successfully!', 'success');
    } catch (error) {
      console.error("Redux addToCart error", error);
      showToast('Failed to add product to cart', 'error');
    }
  };

  const handleRemoveFromCart = (id: string) => {
    try {
      dispatch(removeFromCart(id));
      showToast('Product removed from cart', 'success');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast('Failed to remove product from cart', 'error');
    }
  };

  const handleClearCart = () => {
    try {
      dispatch(clearCart());
      showToast('Cart cleared successfully', 'success');
    } catch (error: unknown) {
      console.error("Redux clearCart error", error);
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast('Failed to clear cart', 'error');
      }
    }
  };

  return {
    cartItems: items,
    isLoading,
    error,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    cartCount: items.length
  };
};