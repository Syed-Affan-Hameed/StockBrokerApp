import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json()); // middleware: allows us to work with JSON

// Define allowed origins
const allowedOrigins = [
    "http://localhost:5173", // Local Vite development server
  "http://localhost:3000"  // Deployed app
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);  // Allow the request
    } else {
      return callback(new Error('Not allowed by CORS'));  // Reject other origins
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowable methods
  credentials: true,  // Allow credentials like cookies if needed
  allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
}));
