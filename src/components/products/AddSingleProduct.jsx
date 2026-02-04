import { useState } from "react";
import { createProduct } from "../../api/productApi";
import { toast } from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "Beverage",
  "Snack",
  "Grocery",
  "Home Product",
  "Personal Care",
  "Cleaning Supplies",
  "Stationery",
  "Electronics",
  "Medicine",
  "Baby Products",
  "Pet Supplies",
  "Frozen Food",
  "Bakery",
  "Other",
];

const AddSingleProduct = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    threshold: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePositiveNumber = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setForm({ ...form, [name]: "" });
      return;
    }

    const num = Number(value);
    if (num >= 1) {
      setForm({ ...form, [name]: num });
    }
  };

  const handleNonNegativeNumber = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setForm({ ...form, [name]: "" });
      return;
    }

    const num = Number(value);
    if (num >= 0) {
      setForm({ ...form, [name]: num });
    }
  };

  const preventInvalidKeys = (e) => {
    if (["-", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.productId ||
      !form.category ||
      !form.price ||
      !form.quantity ||
      !form.unit ||
      !form.expiryDate ||
      !form.threshold
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    if (form.price <= 0 || form.quantity <= 0) {
      toast.error("Price and quantity must be greater than 0");
      return;
    }

    if (form.threshold < 0) {
      toast.error("Threshold cannot be negative");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v !== "" && fd.append(k, v));
    if (image) fd.append("image", image);

    try {
      setLoading(true);
      await createProduct(fd);
      toast.success("Product added successfully");
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h3 className="form-title">New Product</h3>

      <div className="image-row">
        <div className="image-preview">
          {image ? image.name : "No image selected"}
        </div>

        <label className="image-upload">
          Drag image here or <span>Browse image</span>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      </div>

      {/* FORM GRID  */}
      <div className="form-grid">
        <label>Product Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleTextChange}
          placeholder="Enter product name"
        />

        <label>Product ID *</label>
        <input
          name="productId"
          value={form.productId}
          onChange={handleTextChange}
          placeholder="Enter unique product ID"
        />

        <label>Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={handleTextChange}
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Price *</label>
        <input
          type="number"
          name="price"
          min="1"
          step="1"
          value={form.price}
          placeholder="Enter price"
          onChange={handlePositiveNumber}
          onKeyDown={preventInvalidKeys}
        />

        <label>Quantity *</label>
        <input
          type="number"
          name="quantity"
          min="1"
          step="1"
          value={form.quantity}
          placeholder="Enter quantity"
          onChange={handlePositiveNumber}
          onKeyDown={preventInvalidKeys}
        />

        <label>Unit *</label>
        <input
          name="unit"
          value={form.unit}
          onChange={handleTextChange}
          placeholder="e.g. pcs, kg"
        />

        <label>Expiry Date *</label>
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleTextChange}
        />

        <label>Threshold Value *</label>
        <input
          type="number"
          name="threshold"
          min="0"
          step="1"
          value={form.threshold}
          placeholder="Low stock alert value"
          onChange={handleNonNegativeNumber}
          onKeyDown={preventInvalidKeys}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Discard
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default AddSingleProduct;
