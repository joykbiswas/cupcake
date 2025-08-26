import React, { useState } from "react";
import Select from "react-select"; // <-- Import React Select

const steps = [
  "PRODUCT INFO",
  "MEDIA",
  // "SOCIALS",
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

const sizeOptions = [
  "Extra Large",
  "Extra Small",
  "Large",
  "Medium",
  "Small",
];

const AddItem = () => {
  const [step, setStep] = useState(0);

  // Example form state (expand as needed)
  type FormState = {
    name: string;
    description: string;
    weight: string;
    category: { value: string; label: string }[];
    sizes: string;
    images: File[];
    price: string;
    sku: string;
    tags: string[];
  };

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    weight: "",
    category: [categoryOptions[0]],
    sizes: "Medium",
    images: [],
    price: "",
    sku: "",
    tags: ["In Stock", "Out of Stock"],
  });

  // For file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({
        ...form,
        images: Array.from(e.target.files),
      });
    }
  };

  // Stepper UI
  const Stepper = () => (
    <div className="w-full flex justify-center mb-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg w-full max-w-4xl px-8 py-4 flex flex-col">
        <div className="flex items-center justify-between w-full">
          {steps.map((label, idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    step >= idx ? "border-white bg-white" : "border-gray-400 bg-gray-700"
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

  // Step content
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
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Weight</label>
                <input
                  type="text"
                  className="w-full border-b py-2 outline-none"
                  value={form.weight}
                  onChange={e => setForm({ ...form, weight: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Description <span className="text-xs text-gray-400">(optional)</span>
                </label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-[80px] outline-none"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Some initial bold text"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={form.category}
                  onChange={selected => setForm({ ...form, category: Array.from(selected as { value: string; label: string }[]) })}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select categories..."
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Sizes</label>
                <select
                  className="w-full border-b py-2 outline-none"
                  value={form.sizes}
                  onChange={e => setForm({ ...form, sizes: e.target.value })}
                >
                  {sizeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
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
              {form.images.length === 0 ? (
                <span>Drop files here to upload or click to select</span>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {form.images.map((file: File, idx: number) => (
                    <span key={idx} className="bg-gray-200 px-3 py-1 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                multiple
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  className="w-full border-b py-2 outline-none"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
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
            <div className="mt-6">
              <label className="block mb-1 font-medium">Tags</label>
              <div className="flex gap-2 flex-wrap">
                {form.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="bg-black text-white px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      className="ml-1 text-xs"
                      onClick={() =>
                        setForm({
                          ...form,
                          tags: form.tags.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="border-b outline-none px-2"
                  placeholder="Add tag"
                  onKeyDown={e => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      setForm({
                        ...form,
                        tags: [...form.tags, e.currentTarget.value],
                      });
                      e.currentTarget.value = "";
                    }
                  }}
                />
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
                onClick={() => {
                  console.log("Form Data:", form);
                  alert("Product submitted!");
                }}
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
      <p className="text-gray-500 text-center mb-8">
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