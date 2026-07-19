const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const generateTrip = async (tripData) => {
  const response = await fetch(`${API_URL}/api/ai/trip-planner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate trip");
  }

  return data;
};
