# Notes Application Backend

A RESTful API backend for a Notes Application, built with Node.js, Express, and MongoDB. This backend provides user authentication and CRUD operations for notes, supporting features like pinning, archiving, and tagging notes.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Create, read, update, and delete notes
- Pin, archive, and soft-delete notes
- Tagging support for notes
- Protected routes for notes (authentication required)

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration

---

## Getting Started

### Prerequisites
- Node.js (v16 or above)
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Notes_App_Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the server:
   ```bash
   npm run dev
   # or
   npm start
   ```

The server will run on `http://localhost:5000` by default.

---

## Environment Variables
- `PORT`: Port number for the server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

---

## API Endpoints

### User Authentication
- `POST /api/user/register` — Register a new user
  - Body: `{ username, email, password }`
- `POST /api/user/login` — Login and receive JWT token
  - Body: `{ email, password }`

### Notes (Protected: Requires `Authorization: Bearer <token>` header)
- `POST /api/notes/create` — Create a new note
  - Body: `{ title, description, tags?, pinned?, archived?, deleted? }`
- `GET /api/notes/get` — Get all notes for the authenticated user
- `PUT /api/notes/edit/:id` — Edit a note by ID
  - Body: `{ title?, description?, tags?, pinned?, archived?, deleted? }`
- `PUT /api/notes/toggle/:id` — Toggle note status (pinned, archived, deleted)
  - Body: `{ action: "pinned" | "archived" | "deleted" }`
- `DELETE /api/notes/delete/:id` — Delete a note by ID

---

## Project Structure
```
Notes_App_Backend/
│
├── Config/
│   └── dbConfig.js           # MongoDB connection setup
├── Controller/
│   ├── notesController.js    # Notes business logic
│   └── userController.js     # User authentication logic
├── Middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── Models/
│   ├── noteModel.js          # Note schema
│   └── userModel.js          # User schema
├── Routes/
│   ├── notesRoute.js         # Notes API routes
│   └── userRoute.js          # User API routes
├── index.js                  # Entry point
├── package.json
└── .env                      # Environment variables
```

---

