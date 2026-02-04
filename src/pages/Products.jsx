import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../api/productApi";
import { getHomeDashboard } from "../api/dashboard";
import "../styles/productStyles.css";

import InventoryStats from "../components/products/InventoryStats";
import ProductTable from "../components/products/ProductTable";
import AddProductModal from "../components/products/AddProductModal";
import AddSingleProduct from "../components/products/AddSingleProduct";
import BuyProductModal from "../components/products/BuyProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [inventoryStats, setInventoryStats] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(null); // null | "single"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000);
    return () => clearTimeout(t);
  }, [search]);

  //Load products table
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProducts(page, 10, debouncedSearch);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  //Load inventory stats
  const loadInventoryStats = async () => {
    try {
      const res = await getHomeDashboard();
      setInventoryStats({
        categories: res.data.inventoryStats.categoriesCount,
        productsLast7Days: res.data.inventoryStats.productsLast7Days,
        revenueLast7Days: res.data.inventoryStats.revenueLast7Days,
        topSellingQty7Days: res.data.inventoryStats.topSellingQty7Days,
        topSellingRevenue: res.data.inventoryStats.topSellingRevenue7Days,
        lowStock: res.data.inventoryStats.lowStockCount,
        outOfStock: res.data.inventoryStats.outOfStockCount,
      });
    } catch (err) {
      console.error("Failed to load inventory stats", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadInventoryStats();
  }, [loadProducts]);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const handleAddSuccess = () => {
    setAddMode(null);
    setPage(1);
    loadProducts();
    loadInventoryStats();
  };

  return (
    <div className="dashboard-container">
      <div className="products-top-bar">
        <h4>Products</h4>

        {addMode === null && (
          <input
            className="product-search"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      <hr />

      {/* list view */}
      {addMode === null && (
        <>
          <div className="card">
            <h3 className="card-title">Overall Inventory</h3>
            <InventoryStats data={inventoryStats} />
          </div>

          <div className="card">
            <div className="products-table-header">
              <h3>Products</h3>
              <button
                className="primary-btn floating-add-product"
                onClick={() => setShowAddModal(true)}
              >
                Add Product
              </button>
            </div>

            <ProductTable
              products={products}
              loading={loading}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onBuy={(p) => setSelectedProduct(p)}
            />
          </div>
        </>
      )}

      {/* Add Single Product */}
      {addMode === "single" && (
        <>
          <div className="products-sub-header">
            <span>Add Product</span>
            <span className="breadcrumb"> › Individual Product</span>
          </div>

          <div className="add-product-form">
            <AddSingleProduct
              onCancel={() => setAddMode(null)}
              onSuccess={handleAddSuccess}
            />
          </div>
        </>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSelectSingle={() => {
            setShowAddModal(false);
            setAddMode("single");
          }}
          onSuccess={handleAddSuccess}
        />
      )}

      {selectedProduct && (
        <BuyProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={() => {
            loadProducts();
            loadInventoryStats();
          }}
        />
      )}
    </div>
  );
};

export default Products;
