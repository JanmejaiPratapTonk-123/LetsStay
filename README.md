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
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
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
| ✅ | PostgreSQL + Prisma ORM Integration |
| ✅ | Deployment |
| ⬜ | Authentication |
| ⬜ | Booking System |

> **Note:** The database schema already includes models for upcoming features such as users and bookings. The corresponding API endpoints and frontend functionality will be implemented in future phases.

---

## ✨ Highlights

- ⚛️ **React + Vite** frontend with dark mode and category filtering
- 🚀 **Express.js REST API** with full CRUD and keyword search
- 🔄 **Frontend ↔ Backend Integration** via a dedicated service layer
- 📱 **Responsive UI** with mobile navigation and loading/error states
- 🗄️ PostgreSQL database hosted on Supabase
- ⚡ Prisma ORM for type-safe database access
- 📐 **Layered Architecture** — routes, controllers, middleware

---

## 📖 Overview

**LetsStay** is a full-stack homestay booking platform built with a **React + Vite** frontend and a **Node.js + Express** REST API backend. It lets users browse, search, and manage property listings through a clean, responsive interface.

The React frontend communicates with the Express API through a centralized service layer (`propertyService.js`), keeping all network logic in one place. The backend uses **PostgreSQL** hosted on Supabase with Prisma ORM for database management and type-safe queries. Data is stored persistently and relationships are managed through Prisma models and migrations.

> Developed as part of the **TBI SIP 2026 AI-Assisted Full Stack Web Development Internship**, with a focus on clean architecture, separation of concerns, and progressive enhancement.

---

## ✨ Features

### Frontend

- 📱 **Responsive UI** — mobile-first layout with a collapsible navigation drawer
- 🌙 **Dark Mode** — toggle persisted to `localStorage`, applied via Tailwind `dark:` classes
- 🃏 **Property Cards** — image, location, price, star rating, and property type badge (currently rendered from frontend seed data)
- 🏷️ **Category Filter** — filter pills that narrow the property grid by category (currently rendered from frontend seed data)
- ⏳ **Loading State** — spinner displayed while awaiting the API response
- ❌ **Error State** — descriptive error message shown if the backend is unreachable
- 🧭 **Client-side Routing** — multi-page navigation using React Router

### Backend

- 🔍 **Keyword Search** — case-insensitive search across `title` and `location`
- ➕ **Create Property** — `POST /api/properties` with full field validation (`title`, `description`, `location`, `price`, `image`, `ownerId` — all required)
- 📖 **Read Properties** — `GET /api/properties` and `GET /api/properties/:id`
- ✏️ **Update Property** — `PUT /api/properties/:id` with full replacement (all fields required)
- 🗑️ **Delete Property** — `DELETE /api/properties/:id` with proper 404 handling
- 🚨 **Global Error Handler** — Express error middleware returning structured JSON responses

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | HTTP server & routing |
| [Prisma ORM](https://www.prisma.io/) | Type-safe ORM |
| [PostgreSQL (Supabase)](https://supabase.com/) | Relational Database |
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
│   ├── lib/
│   │   └── prisma.js               # Prisma Client configuration
│   ├── middleware/
│   │   └── errorHandler.js         # Centralized error handling middleware
│   ├── prisma/
│   │   ├── migrations/             # Database migration history
│   │   └── schema.prisma           # Database schema
│   ├── routes/
│   │   └── propertyRoutes.js       # API routes
│   ├── .env                        # Local environment variables (gitignored)
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── server.js                   # Express app entry point
│
└── frontend/                       # React + Vite SPA
    ├── public/                     # Static assets
    ├── package.json
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

---

## 🎬 Demo

### Live Application

- 🌐 **Frontend:** https://lets-stay.vercel.app/
- ⚙️ **Backend API:** https://letsstay.onrender.com/

You can explore the application through the deployed frontend, which communicates with the Express backend hosted on Render.

---

## 🚀 Getting Started

### Prerequisites

- Latest LTS version of Node.js
- npm
- PostgreSQL database (or a [Supabase](https://supabase.com/) project)

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
# Edit .env and replace the placeholder values with your own Supabase database credentials.

# Generate Prisma Client
npx prisma generate

# Run Prisma migrations to set up the database schema
npx prisma migrate dev

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

# PostgreSQL connection string (used by Prisma via @prisma/adapter-pg)
DATABASE_URL="postgresql://<user>:<password>@<host>:6543/<database>?pgbouncer=true"

# Optional direct PostgreSQL connection (commonly used for Prisma migrations)
DIRECT_URL="postgresql://<user>:<password>@<host>:5432/<database>"
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
| `POST` | `/api/properties` | Create a new property listing | `title`, `description`, `location`, `price`, `image`, `ownerId` |
| `PUT` | `/api/properties/:id` | Update an existing property (full replacement) | `title`, `description`, `location`, `price`, `image`, `ownerId` |
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
  "description": "A cozy seaside retreat with ocean views",
  "location": "Goa",
  "price": 3500,
  "image": "https://example.com/cottage.jpg",
  "ownerId": 1
}
```

**Update a property**
```http
PUT http://localhost:5000/api/properties/1
Content-Type: application/json

{
  "title": "Beachside Cottage",
  "description": "A cozy seaside retreat with ocean views",
  "location": "Goa",
  "price": 4200,
  "image": "https://example.com/cottage.jpg",
  "ownerId": 1
}
```

**Delete a property**
```http
DELETE http://localhost:5000/api/properties/1
```

### Error Responses

| Status | Scenario |
|--------|----------|
| `400 Bad Request` | Missing required fields (all fields are required for create/update) |
| `404 Not Found` | Property ID does not exist / invalid route |
| `500 Internal Server Error` | Unhandled server exception (caught by error middleware) |

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
Prisma Client  (lib/prisma.js)
    ↓
PostgreSQL  (Supabase)
    ↓
JSON Response  { success, data }
```

---

## 🖼️ Screenshots

> 📸 Screenshots will be added after feature completion.
> To add screenshots, place images in a `docs/` folder at the repository root and update this section with standard Markdown image links.

---

## 🚀 Deployment

### Current Status

- ✅ Frontend: Vercel
- ✅ Backend: Render
- ✅ Database: PostgreSQL (Supabase)

### Live URLs

- 🌐 **Frontend:** https://lets-stay.vercel.app/
- ⚙️ **Backend API:** https://letsstay.onrender.com/

---

## 🗺️ Development Roadmap

- ✅ Phase 1 — Project setup, React SPA, component architecture
- ✅ Phase 2 — RESTful API: CRUD, search, error handling
- ✅ Phase 3 — PostgreSQL + Prisma ORM Integration
- ✅ Phase 4 — Deployment (Vercel + Render + Supabase)
- ⬜ Phase 5 — Authentication (JWT)
- ⬜ Phase 6 — Booking System

---

## 🔮 Future Improvements

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
