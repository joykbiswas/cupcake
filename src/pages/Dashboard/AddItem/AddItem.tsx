import React, { useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const steps = [
  "PRODUCT INFO",
  "MEDIA",
  "PRICING",
];

const categoryOptions = [
  { value: "Birthday Cake", label: "Birthday Cake" },
  { value: "Wedding Cake", label: "Wedding Cake" },
  { value: "Cupcake", label: "Cupcake" },
  { value: "Chocolate Cake", label: "Chocolate Cake" },
  { value: "Fruit Cake", label: "Fruit Cake" },
  { value: "Cheesecake", label: "Cheesecake" },
  { value: "Custom Cake", label: "Custom Cake" },
  { value: "Other", label: "Other" },
];

const tagOptions = [
  { value: "peach", label: "peach" },
  { value: "cobbler", label: "cobbler" },
  { value: "chocolate chip", label: "chocolate chip" },
  { value: "orange", label: "orange" },
  { value: "Fruit", label: "Fruit" },
  { value: "vanilla", label: "vanilla" },
  { value: "creamy", label: "creamy" },
  { value: "classic", label: "classic" },
  { value: "lemon", label: "lemon" },
  { value: "citrus", label: "citrus" },
  { value: "strawberry", label: "strawberry" },
  { value: "cheesecake", label: "cheesecake" },
  { value: "red velvet", label: "red velvet" },
  { value: "zesty", label: "zesty" },
  { value: "coconut", label: "coconut" },
  { value: "chocolate", label: "chocolate" },
  { value: "birthday", label: "birthday" },
  { value: "funfetti", label: "funfetti" },
];

const sizeOptions = ["Extra Large", "Extra Small", "Large", "Medium", "Small"];

type FormState = {
  name: string;
  description: string;
  category: { value: string; label: string } | null;
  sizes: string;
  images: string[];
  price: number | "";
  tags: { value: string; label: string }[];
  inStock: boolean;
};

const AddItem = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    category: null,
    sizes: "Medium",
    images: [],
    price: "",
    tags: [],
    inStock: true,
  });
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();
  // For file upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "cake_upload");
    data.append("cloud_name", cloudName);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImage = await res.json();
    setForm((prev) => ({
      ...prev,
      images: [uploadedImage.secure_url],
    }));
    setLoading(false);
  };

  const handleAddCake = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const payload = {
      ...form,
      category: form.category ? form.category.value : "",
      tags: form.tags.map((tag) => tag.value),
      images: form.images[0] || "",
      inStock: form.inStock,
    };
    console.log("payload", payload);

    try {
      const { data } = await axiosPublic.post("/cake", payload);
      console.log("response data:", data);

      if (data.insertedId) {
        Swal.fire({
          title: "Create Success!",
          icon: "success",
        });
        // Reset form and go back to step 0
        setForm({
          name: "",
          description: "",
          category: null,
          sizes: "Medium",
          images: [],
          price: "",
          tags: [],
          inStock: true,
        });
        setStep(0);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to create product.",
          icon: "error",
        });
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Network error.",
        icon: "error",
      });
    }
  };

  const Stepper = () => (
    <div className="w-full flex justify-center mb-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg w-full max-w-4xl px-8 py-4 flex flex-col">
        <div className="flex items-center justify-between w-full">
          {steps.map((label, idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    step >= idx
                      ? "border-white bg-white"
                      : "border-gray-400 bg-gray-700"
                  }`}
                />
                <span
                  className={`mt-2 text-xs font-semibold ${
                    step === idx ? "text-white" : "text-gray-300"
                  }`}
                >
                  {idx + 1}. {label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-400 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border-b py-2 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Sizes</label>
                <select
                  className="w-full border-b py-2 outline-none"
                  value={form.sizes}
                  onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                >
                  {sizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Description{" "}
                  <span className="text-xs text-gray-400">(optional)</span>
                </label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-[80px] outline-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Some initial bold text"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <Select
                    options={categoryOptions}
                    value={form.category}
                    onChange={(selected) =>
                      setForm({
                        ...form,
                        category: selected as {
                          value: string;
                          label: string;
                        } | null,
                      })
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select category..."
                    isMulti={false}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Tags</label>
                  <Select
                    isMulti
                    options={tagOptions}
                    value={form.tags}
                    onChange={(selected) =>
                      setForm({
                        ...form,
                        tags: Array.from(
                          selected as { value: string; label: string }[]
                        ),
                      })
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select Tags..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="bg-black text-white px-6 py-2 rounded-md"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Media</h3>
            <label className="block mb-2 font-medium">Product images</label>
            <div
              className="border rounded-md p-8 flex flex-col items-center justify-center min-h-[120px] text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {loading ? (
                <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
              ) : form.images.length > 0 ? (
                <div className="relative">
                  <img
                    src={form.images[0]}
                    alt="Cake"
                    className="max-h-40 rounded shadow"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((prev) => ({ ...prev, images: [] }));
                    }}
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <span>Drop files here to upload or click to select</span>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
                onClick={() => setStep(step - 1)}
              >
                Prev
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-md"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  className="w-full border-b py-2 outline-none"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">USD</label>
                <select className="w-full border-b py-2 outline-none">
                  <option>BDT</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">In Stock</label>
                <button
                  type="button"
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                    form.inStock ? "bg-black" : "bg-gray-300"
                  }`}
                  onClick={() => setForm({ ...form, inStock: !form.inStock })}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                      form.inStock ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                  <span className="absolute left-2 text-xs font-semibold text-gray-300 select-none">
                    {form.inStock ? "Yes" : "No"}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
                onClick={() => setStep(step - 1)}
              >
                Prev
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-md"
                onClick={handleAddCake}
              >
                Send
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-2">
      <h1 className="text-3xl font-bold text-center mb-2">Add new Product</h1>
      <p className="text-white text-center mb-8">
        This information will let us know more about you.
      </p>
      <Stepper />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
        {renderStep()}
      </div>
    </div>
  );
};

export default AddItem;