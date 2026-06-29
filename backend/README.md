# LetsStay — Backend

Node.js + Express REST API using in-memory data (Week 4).

---

## Prerequisites

- Node.js v18 or later
- npm

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env
# Then open .env and set PORT=5000

# 3. Start the development server
npm run dev
```

Server runs at `http://localhost:5000`.

---

## Project Structure

```
backend/
├── controllers/
│   └── propertyController.js   — logic for all 6 endpoints
├── routes/
│   └── propertyRoutes.js       — URL → controller mappings
├── middleware/
│   └── errorHandler.js         — global error handler
├── data/
│   └── properties.js           — in-memory data (Week 4 only)
├── server.js                   — app entry point
├── .env                        — your local env (not committed)
└── .env.example                — env template
```

---

## API Endpoints

Base URL: `http://localhost:5000/api/properties`

### GET /api/properties
Returns all properties.

```
GET http://localhost:5000/api/properties
```

Response `200`:
```json
{ "success": true, "count": 8, "data": [ ... ] }
```

---

### GET /api/properties/search?q=
Keyword search across title, location, type, and category.

```
GET http://localhost:5000/api/properties/search?q=goa
GET http://localhost:5000/api/properties/search?q=villa
```

Response `200`:
```json
{ "success": true, "count": 2, "data": [ ... ] }
```

---

### GET /api/properties/:id
Returns a single property by id.

```
GET http://localhost:5000/api/properties/1
```

Response `200`:
```json
{ "success": true, "data": { ... } }
```

Response `404` (id not found):
```json
{ "success": false, "message": "Property with id 99 not found" }
```

---

### POST /api/properties
Creates a new property. `title` and `price` are required.

```
POST http://localhost:5000/api/properties
Content-Type: application/json

{
  "title": "Lake House in Udaipur",
  "location": "Udaipur, Rajasthan",
  "price": 4800,
  "type": "Villa",
  "category": "Heritage"
}
```

Response `201`:
```json
{ "success": true, "data": { "id": 9, "title": "...", ... } }
```

Response `400` (missing required fields):
```json
{ "success": false, "message": "Title and price are required" }
```

---

### PUT /api/properties/:id
Updates an existing property. Only the fields you send are changed.

```
PUT http://localhost:5000/api/properties/3
Content-Type: application/json

{
  "price": 5500,
  "rating": 4.9
}
```

Response `200`:
```json
{ "success": true, "data": { "id": 3, "price": 5500, ... } }
```

Response `404` (id not found):
```json
{ "success": false, "message": "Property with id 3 not found" }
```

---

### DELETE /api/properties/:id
Removes a property by id.

```
DELETE http://localhost:5000/api/properties/5
```

Response `200`:
```json
{ "success": true, "message": "Property with id 5 deleted successfully" }
```

Response `404` (id not found):
```json
{ "success": false, "message": "Property with id 5 not found" }
```

---

## Notes

- Data is in-memory only. All changes are lost when the server restarts.
- No authentication is required for any endpoint.
- Week 5 will migrate this to PostgreSQL.

---

## Testing with Postman

A ready-to-use Postman collection is included.

Import:

```
backend/postman_collection.json
```

The collection contains:

- GET All Properties
- GET Property By ID
- Search Properties
- Create Property
- Update Property
- Delete Property
- GET Invalid ID (404)
- POST Missing Price (400)
- PUT Invalid ID (404)
- Unknown Route (404)

---

## Frontend Integration

The frontend communicates with this backend using:

```
http://localhost:5000/api/properties
```

through

```
frontend/src/services/propertyService.js
```
