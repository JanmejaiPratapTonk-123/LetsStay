/**
 * properties.js — Mock data for UI phase only.
 *
 * Field names mirror the expected backend API response shape so this file
 * can be replaced with an Axios call returning the same JSON structure
 * during the integration phase with no changes to any component.
 *
 * TEMPORARY: All `image` values are local placeholder paths served from
 * public/images/. They will be replaced with URLs from backend cloud
 * storage (e.g. AWS S3 or Cloudinary) during the integration phase.
 */

export const CATEGORIES = [
  "All",
  "Beach",
  "Mountain",
  "City",
  "Heritage",
  "Eco-stay",
  "Countryside",
];

export const PROPERTIES = [
  {
    id: 1,
    title: "Seaside Cottage in Goa",
    location: "Calangute, Goa",
    city: "Goa",
    country: "India",
    price: 3200, // ₹ per night — maps to `price_per_night` in DB
    rating: 4.9,
    reviews: 128,
    type: "Cottage",
    category: "Beach",
    image: "/images/property-1.jpg", // TEMPORARY placeholder
    isFavorited: false,
    amenities: ["WiFi", "Pool", "Kitchen", "AC"],
  },
  {
    id: 2,
    title: "Mountain Retreat in Manali",
    location: "Manali, Himachal Pradesh",
    city: "Manali",
    country: "India",
    price: 2800,
    rating: 4.7,
    reviews: 94,
    type: "Cabin",
    category: "Mountain",
    image: "/images/property-2.jpg", // TEMPORARY placeholder
    isFavorited: true,
    amenities: ["WiFi", "Fireplace", "Kitchen", "Heating"],
  },
  {
    id: 3,
    title: "Heritage Haveli in Jaipur",
    location: "Old City, Jaipur",
    city: "Jaipur",
    country: "India",
    price: 4500,
    rating: 4.8,
    reviews: 207,
    type: "Haveli",
    category: "Heritage",
    image: "/images/property-3.jpg", // TEMPORARY placeholder
    isFavorited: false,
    amenities: ["WiFi", "Breakfast", "Rooftop", "AC"],
  },
  {
    id: 4,
    title: "Urban Studio in Mumbai",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    country: "India",
    price: 2200,
    rating: 4.6,
    reviews: 63,
    type: "Studio",
    category: "City",
    image: "/images/property-4.jpg", // TEMPORARY placeholder
    isFavorited: false,
    amenities: ["WiFi", "Gym", "Kitchen", "AC"],
  },
  {
    id: 5,
    title: "Eco Retreat in Coorg",
    location: "Madikeri, Coorg",
    city: "Coorg",
    country: "India",
    price: 3800,
    rating: 4.9,
    reviews: 152,
    type: "Eco-stay",
    category: "Eco-stay",
    image: "/images/property-5.jpg", // TEMPORARY placeholder
    isFavorited: true,
    amenities: ["Organic Meals", "Hiking", "WiFi", "Solar Power"],
  },
  {
    id: 6,
    title: "Treehouse Stay in Munnar",
    location: "Munnar, Kerala",
    city: "Munnar",
    country: "India",
    price: 5200,
    rating: 4.8,
    reviews: 89,
    type: "Treehouse",
    category: "Countryside",
    image: "/images/property-6.jpg", // TEMPORARY placeholder
    isFavorited: false,
    amenities: ["Breakfast", "Nature Walks", "WiFi", "Views"],
  },
  {
    id: 7,
    title: "Backwater Villa in Alleppey",
    location: "Alleppey, Kerala",
    city: "Alleppey",
    country: "India",
    price: 6100,
    rating: 4.7,
    reviews: 173,
    type: "Villa",
    category: "Beach",
    image: "/images/property-7.jpg", // TEMPORARY placeholder
    isFavorited: false,
    amenities: ["Pool", "Boat Ride", "Breakfast", "AC"],
  },
  {
    id: 8,
    title: "Colonial Bungalow in Ooty",
    location: "Ooty, Tamil Nadu",
    city: "Ooty",
    country: "India",
    price: 3500,
    rating: 4.6,
    reviews: 45,
    type: "Bungalow",
    category: "Countryside",
    image: "/images/property-8.jpg", // TEMPORARY placeholder
    isFavorited: true,
    amenities: ["Fireplace", "Garden", "WiFi", "Kitchen"],
  },
];
