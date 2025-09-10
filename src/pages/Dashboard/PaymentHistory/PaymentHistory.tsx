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

const PaymentHistory = () => {
  const auth = useAuth();
  const user = auth?.user;
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  console.log("payments history", payments);

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="container mx-auto p-2">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">Total Payments: {payments.length}</h3>
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
                  <td className="p-4">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
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
                        <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                        <table className="w-full border-collapse">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="p-2 text-left text-gray-600">Name</th>
                              <th className="p-2 text-left text-gray-600">Category</th>
                              <th className="p-2 text-left text-gray-600">Quantity</th>
                              <th className="p-2 text-left text-gray-600">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payment.items.map((item, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2">{item.quantity}</td>
                                <td className="p-2">${item.price.toFixed(2)}</td>
                              </tr>
                            ))}
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
    </div>
  );
};

export default PaymentHistory;