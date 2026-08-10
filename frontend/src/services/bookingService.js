const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/bookings`
  : "http://localhost:5000/api/bookings";

function getAuthHeaders(token) {
  if (!token) {
    throw new Error("Please log in to continue.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }

    if (res.status === 403) {
      throw new Error("You do not have permission to perform this action.");
    }

    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

export async function createBooking(propertyId, checkIn, checkOut, token) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ propertyId, checkIn, checkOut }),
  });

  return handleResponse(res);
}

export async function getMyBookings(token) {
  const res = await fetch(`${BASE_URL}/my-bookings`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(res);
}

export async function getHostBookings(token) {
  const res = await fetch(`${BASE_URL}/host-bookings`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(res);
}

export async function getBookingById(id, token) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(res);
}
