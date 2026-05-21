# 🔄 CRUD Operations Guide

## What is CRUD?

**CRUD** = **Create, Read, Update, Delete** - The four basic operations for managing data.

| Operation | HTTP Method | Purpose | Example |
|-----------|-------------|---------|---------|
| **C**reate | `POST` | Add new data | Add a new product |
| **R**ead | `GET` | Retrieve data | Get all products or a single product |
| **U**pdate | `PUT` / `PATCH` | Modify existing data | Update product price |
| **D**elete | `DELETE` | Remove data | Delete a product |

---

## 📖 READ (GET) - Fetching Data

### Using fetch()

```javascript
// GET all products
const getAllProducts = async () => {
  const response = await fetch('http://localhost:3001/products');
  const products = await response.json();
  return products;
};

// GET single product
const getProductById = async (id) => {
  const response = await fetch(`http://localhost:3001/products/${id}`);
  const product = await response.json();
  return product;
};

// GET products by category
const getProductsByCategory = async (category) => {
  const response = await fetch(`http://localhost:3001/products?category=${category}`);
  return await response.json();
};
```

### React Example with useEffect (GET)

```javascript
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array = run once on mount

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Real Example from Your Code:**
```javascript
// src/Context/ShopContext.jsx
useEffect(() => {
  fetch("http://localhost:3001/products")
    .then((response) => response.json())
    .then((data) => setAll_Product(data));
}, []);
```

---

## ➕ CREATE (POST) - Adding New Data

### Using fetch()

```javascript
const createProduct = async (product) => {
  const response = await fetch('http://localhost:3001/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const newProduct = await response.json();
  return newProduct;
};
```

### React Form Example (POST)

```javascript
import { useState } from 'react';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'women',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          new_price: parseFloat(formData.price),
          old_price: parseFloat(formData.price) * 1.5,
          available: true,
        }),
      });
      
      const newProduct = await response.json();
      console.log('Created:', newProduct);
      alert('Product created!');
      
      // Reset form
      setFormData({ name: '', price: '', category: 'women' });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Product name"
        required
      />
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        placeholder="Price"
        required
      />
      <button type="submit">Create Product</button>
    </form>
  );
}
```

**Real Example from Your Code:**
```javascript
// src/admin/Components/AddProduct/AddProduct.jsx
await fetch('http://localhost:3001/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product),
});
```

---

## ✏️ UPDATE (PUT/PATCH) - Modifying Data

### PUT vs PATCH

- **PUT**: Replaces the entire resource (must send all fields)
- **PATCH**: Updates only specified fields (send only what changes)

### Using fetch() - PUT

```javascript
const updateProduct = async (id, product) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const updated = await response.json();
  return updated;
};
```

### Using fetch() - PATCH

```javascript
const patchProduct = async (id, updates) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates), // Only changed fields
  });
  const updated = await response.json();
  return updated;
};
```

### React Edit Form Example (PUT)

```javascript
import { useState, useEffect } from 'react';

function EditProduct({ productId }) {
  const [product, setProduct] = useState({ name: '', new_price: '' });
  const [loading, setLoading] = useState(true);

  // Load existing product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      const updated = await response.json();
      alert('Product updated!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}
      />
      <input
        type="number"
        value={product.new_price}
        onChange={(e) => setProduct({...product, new_price: e.target.value})}
      />
      <button type="submit">Update Product</button>
    </form>
  );
}
```

---

## 🗑️ DELETE - Removing Data

### Using fetch()

```javascript
const deleteProduct = async (id) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
```

### React Delete Example

```javascript
import { useState } from 'react';

function DeleteButton({ productId, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setLoading(true);
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE',
      });
      alert('Product deleted!');
      onDelete(productId); // Update parent component
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete Product'}
    </button>
  );
}
```

**Real Example from Your Code:**
```javascript
// src/admin/Components/ListProduct/ListProduct.jsx
const remove_product = async(id) => {
  await fetch(`http://localhost:3001/products/${id}`, {
    method: 'DELETE',
  });
  await fetchInfo(); // Refresh list
}
```

---

## 📝 Complete Code Examples

### 1. db.json Sample

```json
{
  "products": [
    {
      "id": 1,
      "name": "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
      "category": "women",
      "image": "/static/media/product_1.5a757396ee7ff5dd91c1.png",
      "new_price": 50.0,
      "old_price": 80.5,
      "available": true
    },
    {
      "id": 2,
      "name": "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
      "category": "men",
      "image": "/static/media/product_13.png",
      "new_price": 85.0,
      "old_price": 120.5,
      "available": true
    }
  ],
  "users": [],
  "cart": []
}
```

### 2. services/api.js - API Functions

```javascript
const API_BASE_URL = 'http://localhost:3001';

// GET - Fetch all products
export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return await response.json();
};

// GET - Fetch single product
export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return await response.json();
};

// POST - Create new product
export const createProduct = async (product) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await response.json();
};

// PUT - Update product
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await response.json();
};

// DELETE - Delete product
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
```

### 3. useEffect Fetch Example (GET)

```javascript
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Run once on mount

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 4. Form POST Example

```javascript
import { useState } from 'react';

function ProductForm() {
  const [formData, setFormData] = useState({ name: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          new_price: parseFloat(formData.price),
          old_price: parseFloat(formData.price) * 1.5,
          category: 'women',
          available: true,
        }),
      });
      const newProduct = await response.json();
      console.log('Created:', newProduct);
      setFormData({ name: '', price: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Product name"
      />
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        placeholder="Price"
      />
      <button type="submit">Create Product</button>
    </form>
  );
}
```

### 5. Edit/Update Example (PUT)

```javascript
import { useState, useEffect } from 'react';

function EditProduct({ productId }) {
  const [product, setProduct] = useState({ name: '', new_price: '' });

  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch(`http://localhost:3001/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    loadProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      alert('Product updated!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}
      />
      <button type="submit">Update</button>
    </form>
  );
}
```

### 6. Delete Example

```javascript
function DeleteButton({ productId, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`http://localhost:3001/products/${productId}`, {
          method: 'DELETE',
        });
        onDelete(productId);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

---

## 🎯 Summary

✅ **GET** - Use `fetch()` with no method (defaults to GET)  
✅ **POST** - Use `fetch()` with `method: 'POST'` and `body: JSON.stringify(data)`  
✅ **PUT** - Use `fetch()` with `method: 'PUT'` to replace entire resource  
✅ **DELETE** - Use `fetch()` with `method: 'DELETE'`

All examples are working and tested with JSON-Server on port 3001!

