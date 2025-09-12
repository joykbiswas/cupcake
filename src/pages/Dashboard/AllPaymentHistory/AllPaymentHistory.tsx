import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

interface Item {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface Payment {
  _id: string;
  cartIds: string[];
  date: string;
  email: string;
  items: Item[];
  menuItemsIds: string[];
  price: number;
  status: string;
  transactionId: string;
}

const AllPaymentHistory = () => {
  const auth = useAuth();
  const user = auth?.user;
  const axiosSecure = useAxiosSecure();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-2">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading payment history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto p-2">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-lg text-gray-600">
            Failed to load payment history
          </p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">
        Total Payments: {payments.length}
      </h3>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-lg p-8">
          <div className="text-6xl mb-4">📝</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            No payment history found
          </h4>
          <p className="text-gray-500">You haven't made any payments yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: Payment, index: number) => (
                <>
                  <tr
                    key={payment._id}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleRow(payment._id)}
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{payment.email}</td>
                    <td className="p-4">${payment.price.toFixed(2)}</td>
                    <td className="p-4">{payment.transactionId}</td>
                    <td className="p-4">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-sm ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {expandedRow === payment._id ? (
                        <span className="text-blue-600">▼</span>
                      ) : (
                        <span className="text-blue-600">▶</span>
                      )}
                    </td>
                  </tr>
                  {expandedRow === payment._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="p-4">
                        <div className="overflow-x-auto">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            Items:
                          </h4>
                          <table className="w-full border-collapse">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="p-2 text-left text-gray-600">
                                  Name
                                </th>
                                <th className="p-2 text-left text-gray-600">
                                  Category
                                </th>
                                <th className="p-2 text-left text-gray-600">
                                  Quantity
                                </th>
                                <th className="p-2 text-left text-gray-600">
                                  Price
                                </th>
                                <th className="p-2 text-left text-gray-600">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {payment.items.map((item, idx) => (
                                <tr key={idx} className="border-b">
                                  <td className="p-2">{item.name}</td>
                                  <td className="p-2">{item.category}</td>
                                  <td className="p-2">{item.quantity}</td>
                                  <td className="p-2">
                                    ${item.price.toFixed(2)}
                                  </td>
                                  <td className="p-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="font-semibold">
                                <td colSpan={4} className="p-2 text-right">
                                  Grand Total:
                                </td>
                                <td className="p-2">
                                  ${payment.price.toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPaymentHistory;
