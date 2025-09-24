import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../Stripe/stripe";
import StripeCheckoutForm from "../Stripe/StripeCheckoutForm";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  email: string;
  menuId: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCartUpdate: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onCartUpdate,
}: CartDrawerProps) {
  const axiosSecure = useAxiosSecure();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setIsCheckout(false);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleDeleteItem = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await axiosSecure.delete(`/cart/${id}`);
      if (res.data.deletedCount > 0) {
        onCartUpdate();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out dark:bg-gray-800 rounded-l-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-tl-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <svg className="h-6 w-6 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isCheckout ? 'Checkout' : 'Your Cart'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-white/50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-gray-600"
            >
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/*Payment Card Content */}
          <div className="flex-1 overflow-y-auto">
            {isCheckout ? (
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm 
                  cartItems={cartItems} 
                  onClose={onClose} 
                  onCartUpdate={onCartUpdate} 
                />
              </Elements>
            ) : (
              /* Cart View (enhanced) */
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    <svg
                      className="h-20 w-20 mb-4 text-pink-300 dark:text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some delicious treats to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 p-4 border rounded-xl bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 object-cover rounded-lg shadow-sm"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {item.name}
                            </h3>
                            <p className="text-pink-600 dark:text-pink-400 font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {item.category}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="bg-gray-100 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-medium">
                              Qty: {item.quantity || 1}
                            </div>
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              disabled={isDeleting === item._id}
                              className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                              title="Remove item"
                            >
                              {isDeleting === item._id ? (
                                <svg
                                  className="h-5 w-5 animate-spin"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 p-5 border rounded-xl bg-gradient-to-r from-gray-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <svg className="h-5 w-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Order Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                          <span>Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                          <span>Shipping</span>
                          <span className="font-medium">${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-300">
                          <span>Tax</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-3 mt-2 border-t border-gray-200 dark:border-gray-600">
                          <span>Total</span>
                          <span className="text-pink-600 dark:text-pink-400">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsCheckout(true)}
                        className="mt-5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 font-medium text-white transition-all hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-800 shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {!isCheckout && (
            <div className="p-5 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={onClose}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}