import { useEffect, useState } from "react";
import {
  fetchAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

function AdminCRUD() {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  async function loadProperties() {
    try {
      const res = await fetchAllProperties();
      setProperties(res.data);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    void loadProperties();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (editingId) {
        await updateProperty(editingId, payload);
        alert("Property Updated");
      } else {
        await createProperty(payload);
        alert("Property Created");
      }

      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        image: "",
      });

      setEditingId(null);
      loadProperties();
    } catch (err) {
      alert(err.message);
    }
  }

  function handleEdit(property) {
    setEditingId(property.id);

    setFormData({
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price,
      image: property.image,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(id);
      alert("Property Deleted");
      loadProperties();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h1>Admin Property Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="/images/property-1.jpg"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Property" : "Create Property"}
        </button>
      </form>

      <hr />

      <h2>Properties</h2>

      {properties.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <p>
            <b>ID:</b> {property.id}
          </p>

          <p>
            <b>Title:</b> {property.title}
          </p>

          <p>
            <b>Location:</b> {property.location}
          </p>

          <p>
            <b>Price:</b> ₹{Number(property.price).toLocaleString("en-IN")}
          </p>

          <img
            src={property.image}
            alt={property.title}
            width="250"
          />

          <br />
          <br />

          <button onClick={() => handleEdit(property)}>Edit</button>

          <button
            onClick={() => handleDelete(property.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminCRUD;