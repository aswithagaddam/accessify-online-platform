/**
 * API Service - All API calls using fetch()
 * Base URL: JSON-Server running on localhost:3001
 * 
 * This file contains all CRUD operations for the e-commerce application
 */

const API_BASE_URL = 'http://localhost:3001';

// ============================================
// GET OPERATIONS
// ============================================

/**
 * GET - Fetch all products
 * @returns {Promise<Array>} Array of all products
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * GET - Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * GET - Fetch products by category
 * @param {string} category - Product category (women, men, kids)
 * @returns {Promise<Array>} Array of products in the category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * GET - Fetch popular products (first 4 women products)
 * @returns {Promise<Array>} Array of popular products
 */
export const getPopularProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=women&_limit=4`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
};

/**
 * GET - Fetch new collections (latest 8 products)
 * @returns {Promise<Array>} Array of new collection products
 */
export const getNewCollections = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?_limit=8&_sort=id&_order=desc`);
    if (!response.ok) {
      throw new Error('Failed to fetch new collections');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching new collections:', error);
    throw error;
  }
};

// ============================================
// POST OPERATIONS
// ============================================

/**
 * POST - Create a new product
 * @param {Object} product - Product object with name, category, image, new_price, old_price
 * @returns {Promise<Object>} Created product object
 */
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * POST - Create a new user (signup)
 * @param {Object} userData - User object with name, email, password
 * @returns {Promise<Object>} Created user object
 */
export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * POST - Add item to cart
 * @param {Object} cartItem - Cart item object with productId, quantity, etc.
 * @returns {Promise<Object>} Created cart item
 */
export const addToCart = async (cartItem) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// ============================================
// PUT OPERATIONS
// ============================================

/**
 * PUT - Update an existing product
 * @param {number} id - Product ID
 * @param {Object} product - Updated product object
 * @returns {Promise<Object>} Updated product object
 */
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * PUT - Update an existing user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user object
 * @returns {Promise<Object>} Updated user object
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ============================================
// DELETE OPERATIONS
// ============================================

/**
 * DELETE - Remove a product
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Deleted product object
 */
export const removeProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * DELETE - Remove a user
 * @param {number} id - User ID
 * @returns {Promise<Object>} Deleted user object
 */
export const removeUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * DELETE - Remove item from cart
 * @param {number} id - Cart item ID
 * @returns {Promise<Object>} Deleted cart item
 */
export const removeFromCart = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// ============================================
// PATCH OPERATIONS (Partial Update)
// ============================================

/**
 * PATCH - Partially update a product
 * @param {number} id - Product ID
 * @param {Object} updates - Partial product object with only fields to update
 * @returns {Promise<Object>} Updated product object
 */
export const patchProduct = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error patching product:', error);
    throw error;
  }
};


