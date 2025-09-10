import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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

// Stripe Checkout Form Component
const StripeCheckoutForm = ({
  cartItems,
  onClose,
  onCartUpdate,
}: {
  cartItems: CartItem[];
  onClose: () => void;
  onCartUpdate: () => void;
}) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const user = auth?.user;
  // const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const totalPrice = subtotal + shipping + tax;

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (totalPrice > 0) {
        try {
          setLoading(true);
          console.log("Creating payment intent for amount:", totalPrice);

          // Convert to cents for Stripe
          const amountInCents = Math.round(totalPrice * 100);

          const res = await axiosSecure.post("/create-payment-int", {
            price: amountInCents,
          });

          console.log("Payment intent response:", res.data);

          if (res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
            setError("");
          } else {
            setError("No client secret received from server");
          }
        } catch (err: any) {
          console.error("Error creating payment intent:", err);
          console.error("Error response:", err.response?.data);
          setError(
            err.response?.data?.message ||
              "Failed to initialize payment. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    createPaymentIntent();
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setError("Card information not found.");
      setProcessing(false);
      return;
    }

    // Validate card first
    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      setError(cardError.message || "Invalid card details");
      setProcessing(false);
      return;
    }

    setError("");

    // Confirm payment
    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message || "Payment confirmation failed");
        setProcessing(false);
      return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save payment to database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cartItems.map((item) => item._id),
          menuItemIds: cartItems.map((item) => item.menuId || item._id),
          status: "completed",
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            category: item.category,
          })),
        };

        const res = await axiosSecure.post("/payments", payment);

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Clear cart after successful payment
          await Promise.all(
            cartItems.map((item) => axiosSecure.delete(`/cart/${item._id}`))
          );

          onCartUpdate();
          onClose();
          // navigate("/dashboard/paymentHistory");
        }
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
    }

    setProcessing(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Order Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Order Summary
        </h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-gray-700 dark:text-gray-300"
            >
              <span>
                {item.name} × {item.quantity || 1}
              </span>
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
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Payment Information
        </h3>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">Initializing payment...</span>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border border-gray-300 rounded-lg p-3 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                      fontFamily: '"Inter", sans-serif',
                      fontSmoothing: "antialiased",
                    },
                    invalid: {
                      color: "#e5424d",
                      ":focus": {
                        color: "#303238",
                      },
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!stripe || !clientSecret || processing}
              className={`w-full rounded-lg px-6 py-3 font-medium text-white transition-all focus:outline-none ${
                !stripe || !clientSecret || processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                `Pay $${totalPrice.toFixed(2)}`
              )}
            </button>

            {/* Test Card Details - Updated to side-by-side layout */}
            <div className="text-center text-sm text-gray-500 mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="font-semibold mb-3">Test Card Details:</div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex-1 border border-yellow-200 rounded-md p-3 bg-yellow-100">
                  <p className="font-medium mb-1">Visa</p>
                  <p className="text-xs">Card: 4242 4242 4242 4242</p>
                  <p className="text-xs">Exp: future date (12/34)</p>
                  <p className="text-xs">CVV: 3 digits (123)</p>
                </div>
                <div className="flex-1 border border-yellow-200 rounded-md p-3 bg-yellow-100">
                  <p className="font-medium mb-1">Mastercard</p>
                  <p className="text-xs">Card: 5555 5555 5555 4444</p>
                  <p className="text-xs">Exp: future date (12/34)</p>
                  <p className="text-xs">CVV: 3 digits (123)</p>
                </div>
              </div>
            </div>
          </form>
        )}

        {transactionId && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-4">
            <p className="text-green-600 text-sm">
              Transaction ID: {transactionId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeCheckoutForm;