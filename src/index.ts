// src/index.ts
import express, { Express } from "express";
import http from "http"; // Import http module
import fs from "fs"; // Import file system module
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();


// Import router
import route from "./routes/index.router";

// Connect to DB
import "./configs/db/config.db";

// Initialize Express app
const app: Express = express();

// Port configuration
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static(__dirname + "/public"));

// Use body-parser for JSON
app.use(bodyParser.json());

// Configure CORS
app.use(cors({ origin: '*' }));


// Use morgan for logging
app.use(morgan('dev'));

// Define routes
route(app);

// Determine whether to use HTTP or HTTPS based on the environment
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
    console.log(`App running on ${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://localhost:${port}`);
});


