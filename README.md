# Pairly

Pairly is a full-stack social networking and dating platform that enables anonymous messaging, profile discovery, and mutual crush notifications.  
Built using React, Node.js, Express, and MongoDB.

---

## ✨ Features

- JWT-based authentication
- Anonymous messaging
- User profiles
- Crush list & mutual notifications
- Protected routes
- RESTful APIs
- Responsive frontend with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend (client/)

- React
- Vite
- Tailwind CSS
- Axios

### Backend (root)

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 📁 Project Structure

Dating App/
│
├── client/ # React frontend
│
├── controller/ # Backend controllers
├── middleware/ # Auth & custom middleware
├── model/ # MongoDB models
├── router/ # Express routes
│
├── app.js # Express app setup
├── index.js # Server entry point
├── package.json # Backend dependencies
├── .env # Environment variables (not committed)
└── README.md

---

## 🚀 Getting Started

### 1. Clone Repository

````bash
git clone https://github.com/shirshak-18/pairly.git
cd pairly

## Backend Setup
npm install

##Create a .env file in the root directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

##Start backend server
npm start

##Frontend Setup
cd client
npm install
npm run dev


```bash

Frontend runs on Vite (default http://localhost:5173)
Backend runs on http://localhost:3001

Environment Variables
Backend requires:

    MONGO_URI
    JWT_SECRET
    PORT

👨‍💻 Author
Shirshak Dixit

Github: https://github.com/shirshak-18
LinkedIn: https://www.linkedin.com/in/shirshak-dixit-b63330293
````
