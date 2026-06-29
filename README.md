<h1 align="center">
  <br />
  🏡 LetsStay
  <br />
</h1>

<p align="center">
  <strong>A full-stack homestay booking platform with a RESTful API backend and a responsive React frontend.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#development-roadmap">Roadmap</a>
</p>

---

## 🚧 Project Status

| Status | Feature |
|:---:|---|
| ✅ | Responsive React Frontend |
| ✅ | RESTful Express Backend |
| ✅ | Frontend ↔ Backend Integration |
| ✅ | CRUD Property APIs |
| 🔄 | PostgreSQL Integration _(Next Phase)_ |
| ⬜ | Authentication |
| ⬜ | Booking System |
| ⬜ | Deployment |

---

## ✨ Highlights

- ⚛️ **React + Vite** frontend with dark mode and category filtering
- 🚀 **Express.js REST API** with full CRUD and keyword search
- 🔄 **Frontend ↔ Backend Integration** via a dedicated service layer
- 📱 **Responsive UI** with mobile navigation and loading/error states
- 📦 **In-memory Data Store** — PostgreSQL migration planned for next phase
- 📐 **Clean MVC Architecture** — routes, controllers, middleware, services

---

## 📖 Overview

**LetsStay** is a full-stack homestay booking platform built with a **React + Vite** frontend and a **Node.js + Express** REST API backend. It lets users browse, search, and manage property listings through a clean, responsive interface.

The React frontend communicates with the Express API through a centralized service layer (`propertyService.js`), keeping all network logic in one place. The backend currently uses in-memory data storage; a **PostgreSQL** migration is planned for the next development phase.

> Developed as part of the **TBI SIP 2026 AI-Assisted Full Stack Web Development Internship**, with a focus on clean architecture, separation of concerns, and progressive enhancement.

---

## ✨ Features

### Frontend

- 📱 **Responsive UI** — mobile-first layout with a collapsible navigation drawer
- 🌙 **Dark Mode** — toggle persisted to `localStorage`, applied via Tailwind `dark:` classes
- 🃏 **Property Cards** — image, location, price, star rating, and property type badge
- 🏷️ **Category Filter** — filter pills that narrow the property grid by category
- ⏳ **Loading State** — spinner displayed while awaiting the API response
- ❌ **Error State** — descriptive error message shown if the backend is unreachable
- 🧭 **Client-side Routing** — Client-side Routing using React Router.

### Backend

- 🔍 **Keyword Search** — case-insensitive search across title, location, type, and category
- ➕ **Create Property** — `POST /api/properties` with `title` + `price` validation
- 📖 **Read Properties** — `GET /api/properties` and `GET /api/properties/:id`
- ✏️ **Update Property** — `PUT /api/properties/:id` with safe field merge (ID always preserved)
- 🗑️ **Delete Property** — `DELETE /api/properties/:id` with proper 404 handling
- 🚨 **Global Error Handler** — Express error middleware returning structured JSON responses

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | HTTP server & routing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [cors](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [Nodemon](https://nodemon.io/) | Development auto-restart (dev only) |

### Frontend

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | Client-side routing |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 📁 Project Structure

```
LetsStay/
├── README.md
├── backend/                        # Express REST API
│   ├── controllers/
│   │   └── propertyController.js   # Business logic for all property endpoints
│   ├── routes/
│   │   └── propertyRoutes.js       # Route → controller mapping (no logic)
│   ├── middleware/
│   │   └── errorHandler.js         # Centralized error handling middleware
│   ├── data/
│   │   └── properties.js           # In-memory data store (PostgreSQL in next phase)
│   ├── .env                        # Local environment variables (gitignored)
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── server.js                   # Express app entry point
│
└── frontend/                       # React + Vite SPA
    ├── public/                     # Static assets
    └── src/
        ├── components/             # Reusable UI components
        │   ├── Navbar.jsx
        │   ├── Hero.jsx
        │   ├── Card.jsx
        │   ├── Footer.jsx
        │   ├── SectionHeading.jsx
        │   └── ui/                 # Atomic UI primitives
        ├── pages/                  # Route-level page components
        │   ├── Home.jsx
        │   ├── About.jsx
        │   ├── Dashboard.jsx
        │   ├── Login.jsx
        │   └── ComponentDemo.jsx
        ├── services/
        │   └── propertyService.js  # All fetch() calls centralized here
        ├── data/                   # Static/seed data for the frontend
        ├── App.jsx                 # Router & layout root
        ├── main.jsx                # React DOM entry point
        └── index.css               # Global styles
```

> **Tip — Screenshots:** Add a `docs/` folder at the repository root to store screenshots referenced in the [Screenshots](#️-screenshots) section:
>
> ```
> docs/
> ├── home.png
> ├── dashboard.png
> ├── network.png
> └── architecture.png
> ```

---

## 🎬 Demo

The live demo will be added after the application is deployed.

Planned demo links:
- 🌐 Frontend Application
- 🔗 Backend REST API
- 📬 Postman API Documentation

Until deployment, the project can be run locally by following the **Getting Started** section.

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/JanmejaiPratapTonk-123/LetsStay.git
cd LetsStay
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your local environment file
cp .env.example .env

# Start the development server (with hot reload)
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

Open a **new terminal** in the project root:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

The backend reads configuration from a `.env` file. Copy `.env.example` and fill in the required values:

```bash
cp backend/.env.example backend/.env
```

**`backend/.env.example`**

```env
# Server port — the Express server will listen on this port
PORT=5000
```

**`frontend` — optional**

If you need to point the frontend at a non-default backend URL (e.g., a staging server), create `frontend/.env`:

```env
# Override the default http://localhost:5000 backend URL
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit your `.env` files. Both `.gitignore` files in this repo already exclude them.

---

## 📡 API Reference

All endpoints are prefixed with `/api/properties`. The server always responds with a structured JSON envelope:

```json
{
  "success": true | false,
  "count": 12,        // present on list responses
  "data": { ... },    // present on success
  "message": "..."    // present on error or delete
}
```

<details>
<summary><strong>📋 Full Endpoint Table</strong></summary>

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/properties` | Retrieve all property listings | — |
| `GET` | `/api/properties/search?q={term}` | Case-insensitive keyword search | — |
| `GET` | `/api/properties/:id` | Retrieve a single property by ID | — |
| `POST` | `/api/properties` | Create a new property listing | `title`, `price` (required) |
| `PUT` | `/api/properties/:id` | Update an existing property (merge) | Any property fields |
| `DELETE` | `/api/properties/:id` | Delete a property by ID | — |
| `GET` | `/` | Health check — confirms server is running | — |

</details>

### Example Requests

**Get all properties**
```http
GET http://localhost:5000/api/properties
```

**Search by keyword**
```http
GET http://localhost:5000/api/properties/search?q=goa
```

**Get property by ID**
```http
GET http://localhost:5000/api/properties/1
```

**Create a property**
```http
POST http://localhost:5000/api/properties
Content-Type: application/json

{
  "title": "Beachside Cottage",
  "price": 3500,
  "location": "Goa",
  "type": "cottage",
  "category": "beach"
}
```

**Update a property**
```http
PUT http://localhost:5000/api/properties/1
Content-Type: application/json

{
  "price": 4200
}
```

**Delete a property**
```http
DELETE http://localhost:5000/api/properties/1
```

### Error Responses

| Status | Scenario |
|--------|----------|
| `400 Bad Request` | Missing required fields (`title` or `price`) |
| `404 Not Found` | Property ID does not exist / invalid route |
| `500 Internal Server Error` | Unhandled server exception (caught by error middleware) |

---

## 🗂️ Postman Collection

A ready-to-import Postman collection covering all six endpoints is included in the repository:

```
backend/W4_APICollection_TBI-26100359.json
```

**To import:**
1. Open Postman → **Import**
2. Select `backend/W4_APICollection_TBI-26100359.json`
3. All requests will be pre-configured with the correct URLs and sample bodies

---

## 🏗️ Architecture & Request Flow

```
React (Browser)
    ↓
Service Layer  (propertyService.js)
    ↓
Express Router  (propertyRoutes.js)
    ↓
Controller  (propertyController.js)
    ↓
Data Store  (in-memory → PostgreSQL)
    ↓
JSON Response  { success, data }
```

---

## 🖼️ Screenshots

> 📸 Screenshots will be added after deployment and feature completion.
> To add screenshots, place images in a `docs/` folder at the repository root and update this section with standard Markdown image links.

---

## 🚀 Deployment

Current Status

- Frontend: Local development (Vite)
- Backend: Local development (Express)

Future

- Render / Railway / Vercel deployment planned after PostgreSQL integration.

---

## 🗺️ Development Roadmap

- ✅ **Phase 1** — Project setup, React SPA, component architecture
- ✅ **Phase 2** — RESTful API: full CRUD, keyword search, global error handling
- ⬜ **Phase 3** — PostgreSQL: replace in-memory data store with a relational database
- ⬜ **Phase 4** — Authentication: JWT-based login and protected routes
- ⬜ **Phase 5** — Deployment: Render / Railway / Vercel

---

## 🔮 Future Improvements

- [ ] **PostgreSQL / Prisma** — persistent relational database replacing in-memory store
- [ ] **JWT Authentication** — secure user registration, login, and protected routes
- [ ] **Image Uploads** — property photos via Cloudinary or AWS S3
- [ ] **Booking System** — availability calendar, reservation management
- [ ] **Payment Integration** — Razorpay / Stripe checkout flow
- [ ] **Reviews & Ratings** — guest review system with star ratings
- [ ] **Admin Panel** — dedicated dashboard for property and booking management
- [ ] **Maps Integration** — embed property location with Google Maps / Mapbox
- [ ] **CI/CD Pipeline** — automated testing and deployment on push
- [ ] **Rate Limiting** — API abuse prevention with express-rate-limit

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add property image upload support"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request against `main`

Please ensure your code follows the existing project structure — controllers for logic, routes for mapping, services for API calls on the frontend.

---

## 👨‍💻 Author

<table>
  <tr>
    <td align="center">
      <strong>Janmejai Pratap Tonk</strong><br />
      <a href="https://github.com/JanmejaiPratapTonk-123">@JanmejaiPratapTonk-123</a>
    </td>
  </tr>
</table>

---

<p align="center">
  Built during the <strong>TBI SIP 2026</strong> AI-Assisted Full Stack Web Development Internship.
</p>
