// src/services/productService.js

const API_BASE_URL = "https://your-api.com"; // replace with your actual API URL

export async function getBestSellers() {
  const response = await fetch(`${API_BASE_URL}/products?category=best-sellers`);

  if (!response.ok) {
    throw new Error("Failed to fetch best sellers");
  }

  return response.json();
}