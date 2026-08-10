// services/propertyService.js
//
// All API calls live here. Components import these functions
// and never call fetch() directly.
//
// If the backend URL changes, fix it in one place — here.
// In Week 5, only this file changes when the endpoint shapes change.

const BASE_URL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/properties`
    : "http://localhost:5000/api/properties";

// Helper: parse the response and throw a readable error if it failed
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

// GET /api/properties
export async function fetchAllProperties() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// GET /api/properties/search?q=
export async function searchProperties(query) {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
}

// GET /api/properties/:id
export async function fetchPropertyById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

// POST /api/properties
export async function createProperty(propertyData, token) {
  const jwtToken = token || localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (jwtToken) {
    headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(propertyData),
  });
  return handleResponse(res);
}

// PUT /api/properties/:id
export async function updateProperty(id, propertyData, token) {
  const jwtToken = token || localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (jwtToken) {
    headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(propertyData),
  });
  return handleResponse(res);
}

// DELETE /api/properties/:id
export async function deleteProperty(id, token) {
  const jwtToken = token || localStorage.getItem("token");
  const headers = {};
  if (jwtToken) {
    headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}

