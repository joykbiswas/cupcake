import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  photo?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data as User[];
    },
  });

  const allUsers = usersData || [];
  const totalCount = allUsers.length;

  const totalPages = Math.ceil(totalCount / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const users = allUsers.slice(startIndex, endIndex);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-2">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading users...</p>
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
          <p className="text-lg text-gray-600">Failed to load users</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <h3 className="text-3xl font-semibold text-gray-800 mb-6">
        All Users ({totalCount})
      </h3>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-lg p-8">
          <div className="text-6xl mb-4">👥</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            No users found
          </h4>
          <p className="text-gray-500">There are no users in the system.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Photo</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  {/* <th className="p-4 text-left">Role</th> */}
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => (
                  <React.Fragment key={user._id || index}>
                    <tr
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(user._id)}
                    >
                      <td className="p-4">
                        {startIndex + index + 1}
                      </td>
                      <td className="p-4">
                        {user.photo && user.photo !== "" ? (
                          <img
                            src={user.photo}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No photo</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-gray-900">{user.name}</td>
                      <td className="p-4 text-gray-700">{user.email}</td>
                      {/* */}
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-sm ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : user.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="p-4">
                        {expandedRow === user._id ? (
                          <span className="text-blue-600">▼</span>
                        ) : (
                          <span className="text-blue-600">▶</span>
                        )}
                      </td>
                    </tr>
                    {expandedRow === user._id && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">User Details:</h4>
                              <div className="space-y-2">
                                <p><span className="font-medium">ID:</span> {user._id}</p>
                                <p><span className="font-medium">Email:</span> {user.email}</p>
                                <p><span className="font-medium">Name:</span> {user.name}</p>
                                <p><span className="font-medium">Role:</span> {user.role || "user"}</p>
                                <p><span className="font-medium">Status:</span> {user.status || "active"}</p>
                                {user.createdAt && (
                                  <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Photo:</h4>
                              {user.photo && user.photo !== "" ? (
                                <img
                                  src={user.photo}
                                  alt={user.name}
                                  className="h-32 w-32 rounded-full object-cover mx-auto"
                                />
                              ) : (
                                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                  <span className="text-gray-500">No photo</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, totalCount)}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;