import { useEffect, useState } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  email: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

export default function CartDrawer({ isOpen, onClose, cartItems }: CartDrawerProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsCheckout(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-5xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out dark:bg-gray-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isCheckout ? 'Checkout' : 'Your Cart'}
            </h2>
            <button 
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isCheckout ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Left Column - Shipping and Payment */}
                <div className="space-y-6">
                  {/* Shipping Details */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Shipping Details</h3>
                    <form className="space-y-5">
                      {['Name', 'Number', 'Address'].map((field) => (
                        <div key={field} className="relative">
                          <input
                            type="text"
                            name={field.toLowerCase()}
                            value={formData[field.toLowerCase() as keyof typeof formData]}
                            onChange={handleInputChange}
                            className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                            placeholder={field}
                            id={field.toLowerCase()}
                          />
                          <label
                            htmlFor={field.toLowerCase()}
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 dark:bg-gray-900 dark:text-gray-300"
                          >
                            {field}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>

                  {/* Payment Information */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Payment Information</h3>
                    <form className="space-y-5">
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                          placeholder="Card Number"
                          id="card-number"
                        />
                        <label
                          htmlFor="card-number"
                          className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 dark:bg-gray-900 dark:text-gray-300"
                        >
                          Card Number
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                            placeholder="MM/YY"
                            id="expiry"
                          />
                          <label
                            htmlFor="expiry"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 dark:bg-gray-900 dark:text-gray-300"
                          >
                            Expiry Date
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                            placeholder="CVV"
                            id="cvv"
                          />
                          <label
                            htmlFor="cvv"
                            className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 dark:bg-gray-900 dark:text-gray-300"
                          >
                            CVV
                          </label>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className="peer w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                          placeholder="Billing Address"
                          id="billing-address"
                        />
                        <label
                          htmlFor="billing-address"
                          className="absolute -top-2.5 left-4 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 dark:bg-gray-900 dark:text-gray-300"
                        >
                          Billing Address
                        </label>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-6">
                  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item._id} className="flex justify-between text-gray-700 dark:text-gray-300">
                          <span>{item.name} × {item.quantity || 1}</span>
                          <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-200 pt-4 dark:border-gray-700 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white pt-2 border-t">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Handle purchase completion
                        onClose();
                      }}
                      className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Cart View */
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-8 text-center">{item.quantity || 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="mt-6 p-4 border rounded-lg">
                      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setIsCheckout(true)}
                        className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {!isCheckout && (
            <div className="p-4 border-t">
              <button
                onClick={onClose}
                className="w-full rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}