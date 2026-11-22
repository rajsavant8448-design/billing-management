"use client";

import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", price: 55000, stock: 10 },
  { id: 2, name: "Mobile", price: 25000, stock: 15 },
  { id: 3, name: "Keyboard", price: 1200, stock: 20 },
  { id: 4, name: "Mouse", price: 600, stock: 30 },
  { id: 5, name: "Monitor", price: 12000, stock: 8 },
  { id: 6, name: "Headphones", price: 1800, stock: 12 },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * Number(discount)) / 100;
  const taxableAmount = subtotal - discountAmount;
  const gst = taxableAmount * 0.18;
  const total = taxableAmount + gst;

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Available stock limit reached!");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(
                  item.stock,
                  item.quantity + change
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearBill = () => {
    setCart([]);
    setCustomer("");
    setPhone("");
    setDiscount(0);
  };

  const generateBill = () => {
    if (!customer.trim()) {
      alert("Please enter customer name!");
      return;
    }

    if (cart.length === 0) {
      alert("Please add products to the cart!");
      return;
    }

    window.print();
  };

  const addProduct = () => {
    const name = prompt("Enter product name:");
    if (!name || !name.trim()) return;

    const price = Number(prompt("Enter product price:"));
    if (!Number.isFinite(price) || price <= 0) {
      alert("Enter a valid price!");
      return;
    }

    const stock = Number(prompt("Enter available stock:"));
    if (!Number.isInteger(stock) || stock <= 0) {
      alert("Enter valid stock!");
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: name.trim(),
        price,
        stock,
      },
    ]);
  };

  return (
    <main className="dashboard">

      <aside className="sidebar">
        <h2>💼 BillPro</h2>

        <div className="menu">
          <p className="active">▦ Dashboard</p>
          <p>🛒 Billing</p>
          <p>📦 Products</p>
          <p>📄 Invoices</p>
          <p>⚙ Settings</p>
        </div>

        <div className="sidebar-bottom">
          <h4>Billing Management</h4>
          <small>Version 1.0.0</small>
        </div>
      </aside>

      <section className="main-content">

        <header className="topbar">
          <div>
            <h1>Billing Dashboard</h1>
            <p>Manage your business billing easily.</p>
          </div>

          <div className="profile">
            <span>👤</span>
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="stats">

          <div className="stat-card">
            <span>Total Products</span>
            <h2>{products.length}</h2>
            <small>Available products</small>
          </div>

          <div className="stat-card">
            <span>Cart Items</span>
            <h2>{cart.reduce((s, i) => s + i.quantity, 0)}</h2>
            <small>Current bill items</small>
          </div>

          <div className="stat-card">
            <span>Subtotal</span>
            <h2>₹{subtotal.toLocaleString("en-IN")}</h2>
            <small>Before GST</small>
          </div>

          <div className="stat-card">
            <span>Total Amount</span>
            <h2>₹{total.toLocaleString("en-IN", {
              maximumFractionDigits: 2
            })}</h2>
            <small>Including GST</small>
          </div>

        </section>

        <div className="workspace">

          {/* Product Section */}

          <section className="panel products-panel">

            <div className="panel-header">
              <div>
                <h2>Products</h2>
                <p>Select products to create a bill</p>
              </div>

              <button className="add-btn" onClick={addProduct}>
                + Add Product
              </button>
            </div>

            <div className="product-grid">

              {products.map((product) => (

                <div className="product-card" key={product.id}>

                  <div className="product-icon">📦</div>

                  <h3>{product.name}</h3>

                  <h2>
                    ₹{product.price.toLocaleString("en-IN")}
                  </h2>

                  <p>Stock: {product.stock}</p>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    + Add to Bill
                  </button>

                </div>

              ))}

            </div>

          </section>

          {/* Billing Section */}

          <section className="panel billing-panel">

            <div className="panel-header">
              <div>
                <h2>Create Invoice</h2>
                <p>Customer billing details</p>
              </div>

              <span className="invoice-badge">NEW BILL</span>
            </div>

            <div className="customer-form">

              <label>Customer Name</label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />

              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

            </div>

            <h3 className="cart-heading">Bill Items</h3>

            <div className="cart-items">

              {cart.length === 0 ? (

                <div className="empty-cart">
                  🛒
                  <p>No products added yet</p>
                </div>

              ) : (

                cart.map((item) => (

                  <div className="cart-item" key={item.id}>

                    <div>
                      <strong>{item.name}</strong>
                      <small>₹{item.price.toLocaleString("en-IN")}</small>
                    </div>

                    <div className="quantity">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>

                  </div>

                ))

              )}

            </div>

            <div className="discount-box">
              <label>Discount (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) =>
                  setDiscount(
                    Math.max(0, Math.min(100, Number(e.target.value)))
                  )
                }
              />
            </div>

            <div className="bill-summary">

              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div>
                <span>Discount</span>
                <strong>- ₹{discountAmount.toFixed(2)}</strong>
              </div>

              <div>
                <span>GST (18%)</span>
                <strong>₹{gst.toFixed(2)}</strong>
              </div>

              <div className="grand-total">
                <span>Grand Total</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>

            </div>

            <div className="action-buttons">

              <button className="clear-btn" onClick={clearBill}>
                Clear
              </button>

              <button className="print-btn" onClick={generateBill}>
                🖨 Generate & Print
              </button>

            </div>

          </section>

        </div>

        <footer>
          © 2026 BillPro | Billing Management System
        </footer>

      </section>

    </main>
  );
}