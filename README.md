# Full-Stack Real-Time Chat Application

This is a complete, production-ready real-time chat application built with the MERN stack (React frontend, Express.js/Node.js backend) and Socket.io for real-time communication.

## Stack

-   **Frontend:** React (with Vite), Tailwind CSS
-   **Backend:** Express.js, Node.js
-   **Real-time Communication:** Socket.io

## Features

-   Real-time messaging between multiple users.
-   Users set a username to join the chat.
-   Simple, clean, and responsive user interface.
-   Clear separation of frontend and backend concerns.

## Project Structure

```
/
├── client/         # React Frontend
└── server/         # Express Backend
```

## Setup and Installation

### Prerequisites

-   Node.js (v16 or later recommended)
-   npm or yarn

### 1. Backend Setup

Navigate to the server directory, install dependencies, and start the server.

```bash
# Go to the server directory
cd server

# Install dependencies
npm install

# Start the development server (with nodemon)
npm run dev

# The backend will be running on http://localhost:3001
```

### 2. Frontend Setup

Open a new terminal window. Navigate to the client directory, install dependencies, and start the frontend development server.

```bash
# Go to the client directory
cd client

# Install dependencies
npm install

# Start the development server (with Vite)
npm run dev

# The frontend will be running on http://localhost:5173
```

### 3. Usage

1.  Open your web browser and go to `http://localhost:5173`.
2.  Enter a username and click "Join Chat".
3.  Open another browser tab or window and navigate to the same URL.
4.  Enter a different username.
5.  You can now send messages between the two windows in real-time.
