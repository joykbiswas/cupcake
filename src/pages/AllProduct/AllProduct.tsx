import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Star,
  ShoppingCart,
  Eye,
  LayoutGrid,
  List,
} from "lucide-react";
import { type Cake } from "../../types/cake";
import { COLORS } from "../../constants/colors";
import useMenu from "../../hooks/useMenu";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// ProductCard component moved OUTSIDE of AllProductPage
const ProductCard: React.FC<{
  product: Cake;
  viewType: "grid" | "list";
  onAddToCart: (product: Cake) => void;
}> = ({ product, viewType, onAddToCart }) => {
  const isList = viewType === "list";

  return (
    <div
      className={`${
        isList ? "flex" : ""
      } bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
        isList ? "hover:translate-x-1" : "transform hover:scale-105"
      }`}
    >
      {/* Image container with overflow hidden to contain the scale effect */}
      <div
        className={`${
          isList ? "w-48 h-48 flex-shrink-0" : "w-full h-48"
        } relative overflow-hidden`}
      >
        <img
          src={
            Array.isArray(product.images) ? product.images[0] : product.images
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className={`${isList ? "flex-1" : ""} p-4`}>
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p
          className={`text-gray-600 ${
            isList ? "text-sm" : "text-sm"
          } mb-3 line-clamp-2`}
        >
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {Array.isArray(product.tags) &&
            product.tags.slice(0, 3).map((tag: string) => (
              <span
                key={String(tag)}
                className="bg-[#F5F1E8] text-[#7C5228] text-xs px-2 py-1 rounded-full border border-[#E8E0D0]"
              >
                {String(tag)}
              </span>
            ))}
        </div>

        <div
          className={`flex items-center ${
            isList ? "justify-end gap-4" : "justify-between"
          }`}
        >
          {!isList && (
            <span
              className="text-2xl font-bold"
              style={{ color: COLORS.PRIMARY }}
            >
              ${product.price}
            </span>
          )}
          <div className="flex space-x-2">
            <button className="p-2 bg-[#F5F1E8] text-[#7C5228] rounded-lg hover:bg-[#E8E0D0] transition-colors border border-[#E8E0D0]">
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors text-white shadow-md ${
                product.inStock
                  ? "bg-gradient-to-r from-[#7C5228] to-[#553329] hover:from-[#553329] hover:to-[#7C5228]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 inline mr-1" />
              Add to Cart
            </button>
          </div>
        </div>

        {isList && (
          <div className="mt-3">
            <span
              className="text-xl font-bold"
              style={{ color: COLORS.PRIMARY }}
            >
              ${product.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main AllProductPage component
const AllProductPage: React.FC = () => {
  const [currentItems, isLoading] = useMenu();
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [products, setProducts] = useState<Cake[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    "name" | "price-low" | "price-high" | "rating"
  >("name");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const handleAddToCart = (product: Cake) => {
    if (user && user.email) {
      const cartItem = {
        menuId: product._id,
        email: user.email,
        name: product.name,
        category: product.category,
        image: Array.isArray(product.images)
          ? product.images[0]
          : product.images,
        price: product.price,
      };
      axiosSecure
        .post("/cart", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.name} added to your cart!`,
              showConfirmButton: false,
              timer: 1500,
            });
            queryClient.invalidateQueries({ queryKey: ["cart", user.email] });
          }
        })
        .catch((error) => {
          console.error("Add to cart error:", error);
          Swal.fire("Error", "Failed to add to cart.", "error");
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  useEffect(() => {
    setProducts(currentItems);
  }, [currentItems]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo<Cake[]>(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(product.tags) &&
          product.tags.some((tag: string) =>
            String(tag).toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      let matchesPrice = true;
      if (priceRange === "under-25") matchesPrice = product.price < 25;
      else if (priceRange === "25-35")
        matchesPrice = product.price >= 25 && product.price <= 35;
      else if (priceRange === "over-35") matchesPrice = product.price > 35;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const displayProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 10);

  if (isLoading) {
    return (
      <div className="min-h-screen mt-12 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7C5228] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading delicious cakes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Our Delicious Cakes
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md self-stretch w-full">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for cakes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C5228] focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C5228] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C5228] focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-25">Under $25</option>
                <option value="25-35">$25 - $35</option>
                <option value="over-35">Over $35</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C5228] focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                aria-label="Grid view"
                onClick={() => setViewType("grid")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                  viewType === "grid"
                    ? "bg-[#F5F1E8] text-[#7C5228] border-[#E8E0D0]"
                    : "bg-white text-gray-600 border-gray-200"
                } hover:bg-[#F5F1E8] hover:text-[#7C5228]`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewType("list")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                  viewType === "list"
                    ? "bg-[#F5F1E8] text-[#7C5228] border-[#E8E0D0]"
                    : "bg-white text-gray-600 border-gray-200"
                } hover:bg-[#F5F1E8] hover:text-[#7C5228]`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {displayProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-[#7C5228] hover:text-[#553329] font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍰</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No cakes found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div
              className={`grid ${
                viewType === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {displayProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  viewType={viewType}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {!showAll && filteredProducts.length > 10 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-gradient-to-r from-[#7C5228] to-[#553329] text-white px-8 py-3 rounded-full font-semibold hover:from-[#553329] hover:to-[#7C5228] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Show All Products ({filteredProducts.length - 10} more)
                </button>
              </div>
            )}

            {showAll && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(false)}
                  className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border border-[#E8E0D0] text-[#7C5228] bg-[#F5F1E8] hover:bg-[#E8E0D0]"
                >
                  Show Less
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProductPage;
