#BlogSphere — Full Stack Blogging Platform

BlogSphere is a production-ready full-stack blogging application built with Node.js, Express, MongoDB, and EJS.

It allows users to securely register, authenticate, and create, manage, and publish blog posts. The project follows a clean MVC architecture and demonstrates real-world backend engineering practices.

🔗 Live Application:
👉 https://blogsphere-bud9.onrender.com/

📌 Project Overview

BlogSphere was built to demonstrate:

Scalable backend architecture (MVC pattern)

Secure authentication & authorization

RESTful API design principles

MongoDB data modeling with Mongoose

Production deployment on Render

This project reflects backend-focused development skills suitable for real-world applications.

✨ Key Features
🔐 Authentication & Security

User registration & login

Secure password hashing (bcrypt)

Protected routes

Environment variable management

📝 Blog Management

Create blog posts

Edit blog posts

Delete blog posts

View all posts

View individual post details

🏗 Architecture

MVC structured project

Modular route handling

Clean separation of concerns

Organized folder structure

🛠 Tech Stack
Backend

Node.js

Express.js

Database

MongoDB

Mongoose ODM

Templating Engine

EJS

Dev Tools

Nodemon

dotenv

bcrypt

Deployment

Render

MongoDB Atlas (Cloud Database)

📂 Project Structure
BlogSphere/
│
├── models/          # Database schemas
├── routes/          # Route definitions
├── controllers/     # Business logic
├── views/           # EJS templates
├── public/          # Static files (CSS, assets)
├── config/          # DB configuration
│
├── app.js / server.js
├── package.json
└── .env

⚙️ Installation & Local Setup
1️⃣ Clone the Repository
git clone https://github.com/supriyaguess/BlogSphere.git
cd BlogSphere

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the Server

Development mode:

npm run dev


Production mode:

npm start


Visit in browser:

http://localhost:3000

📡 Core API Routes
Method	Endpoint	Description
GET	/	Fetch all blog posts
GET	/posts/:id	Fetch single post
POST	/posts	Create new post
PUT	/posts/:id	Update post
DELETE	/posts/:id	Delete post
POST	/auth/register	Register user
POST	/auth/login	Authenticate user
🌍 Deployment Details

Hosted on Render

Database hosted on MongoDB Atlas

Environment variables configured securely

Production start script defined in package.json

Live URL:
https://blogsphere-bud9.onrender.com/

📈 What This Project Demonstrates

Backend system design thinking

Authentication and security implementation

Real-world deployment workflow

Database relationship modeling

Clean and maintainable code structure

🚀 Future Enhancements

Add comment system

Add like functionality

Implement image upload (Cloudinary)

Pagination for large datasets

Role-based admin dashboard

Convert to full MERN stack (React frontend)

👩‍💻 Author

Supriya Kumari
GitHub: https://github.com/supriyaguess

