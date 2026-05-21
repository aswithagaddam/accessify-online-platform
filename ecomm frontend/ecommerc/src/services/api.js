/**
 * API Service - All API calls using fetch()
 * Base URL changed from localhost:4000 to localhost:3001 (JSON-Server)
 */
const API_BASE_URL = 'http://localhost:3001';

/**
 * GET - Fetch all products
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * GET - Fetch products by category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * GET - Popular in women (first 4 women products)
 */
export const getPopularInWomen = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=women&_limit=4`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
};

/**
 * GET - New collections (latest 8 products)
 */
export const getNewCollections = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?_limit=8&_sort=id&_order=desc`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching new collections:', error);
    throw error;
  }
};

/**
 * POST - Create new product
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
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * DELETE - Remove product
 */
export const removeProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * POST - User login (mock - JSON-Server doesn't handle auth)
 */
export const login = async (credentials) => {
  // For JSON-Server, we'll just simulate login
  // In real app, you'd check against users array
  return { success: true, auth_token: 'mock_token_' + Date.now() };
};

/**
 * POST - User signup (mock)
 */
export const signup = async (userData) => {
  // For JSON-Server, we'll just simulate signup
  return { success: true, auth_token: 'mock_token_' + Date.now() };
};

/**
 * POST - Add to cart (mock - store in localStorage for JSON-Server)
 */
export const addToCart = async (itemId, size = null) => {
  // JSON-Server doesn't handle complex cart logic
  // Store in localStorage or manage in React state
  return { success: true };
};

/**
 * POST - Remove from cart (mock)
 */
export const removeFromCart = async (itemId, size = null) => {
  return { success: true };
};

/**
 * POST - Get cart (mock)
 */
export const getCart = async () => {
  // Return empty cart or from localStorage
  return {};
};

