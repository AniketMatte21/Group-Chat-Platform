# Group Chat Platform

A full-stack real-time group chat application built with **Spring Boot, WebSocket, STOMP, MongoDB, and React**.

The application provides a real-time communication platform where users can exchange messages through a modern web interface. The backend is responsible for WebSocket-based communication and message persistence, while the React frontend provides the interactive chat experience.

## Features

* Real-time messaging using WebSocket
* STOMP-based messaging communication
* Persistent chat data using MongoDB
* React-based responsive frontend
* Real-time client-server communication
* Toast notifications for user interactions
* Client-side routing
* Modern UI built with Tailwind CSS
* SockJS support for WebSocket communication

## Architecture

The project is divided into two main applications:

```text
Group-Chat-Platform
│
├── chat-backend
│   └── Spring Boot Application
│
└── chat-frontend
    └── React + Vite Application
```

### High-Level Architecture

```text
                    User
                     |
                     v
            +----------------+
            | React Frontend |
            |    + Vite      |
            +-------+--------+
                    |
             WebSocket / STOMP
                    |
                    v
            +----------------+
            | Spring Boot    |
            | Chat Backend   |
            +-------+--------+
                    |
          +---------+---------+
          |                   |
          v                   v
   WebSocket / STOMP      MongoDB
   Message Handling      Persistence
```

## Real-Time Communication

The application uses **Spring WebSocket** together with **STOMP** to provide real-time messaging.

Instead of repeatedly polling the backend for new messages, the client maintains a WebSocket connection with the server.

```text
React Client
     |
     | WebSocket Connection
     v
Spring Boot
     |
     | STOMP Messaging
     v
Message Processing
     |
     v
MongoDB
```

When a message is sent, the backend can process the message and deliver it to connected clients through the WebSocket messaging infrastructure.

## Backend

The backend is implemented using Spring Boot.

### Backend Technology

* Java 17
* Spring Boot 3.4.3
* Spring Web
* Spring WebSocket
* Spring Data MongoDB
* MongoDB
* Lombok
* Maven

The backend project is configured with Spring Boot WebSocket and MongoDB dependencies, providing the foundation for real-time communication and persistent chat data.

### Backend Responsibilities

The backend handles:

* WebSocket connections
* STOMP messaging
* Chat message processing
* Communication between connected clients
* MongoDB persistence
* REST/WebSocket application services

## Frontend

The frontend is built using React and Vite.

### Frontend Technology

* React 19
* React DOM
* Vite
* React Router
* Tailwind CSS
* STOMP.js
* SockJS
* React Use WebSocket
* React Hot Toast
* React Toastify
* React Icons

These dependencies are defined in the project's frontend configuration.

### Frontend Responsibilities

The frontend provides:

* Chat user interface
* Real-time message interaction
* WebSocket connection management
* Client-side navigation
* User feedback and notifications
* Responsive styling

## Technology Stack

| Layer                   | Technologies                    |
| ----------------------- | ------------------------------- |
| Frontend                | React, Vite, JavaScript         |
| Styling                 | Tailwind CSS                    |
| Routing                 | React Router                    |
| Real-Time Communication | WebSocket, STOMP, SockJS        |
| Backend                 | Spring Boot                     |
| Backend Language        | Java 17                         |
| Database                | MongoDB                         |
| Build Tool              | Maven                           |
| Notifications           | React Hot Toast, React Toastify |

## Project Structure

```text
Group-Chat-Platform/
│
├── chat-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   ├── test/
│   │   └── ...
│   │
│   ├── pom.xml
│   └── ...
│
├── chat-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

## Message Flow

A typical real-time messaging flow works conceptually as follows:

```text
User
  |
  v
React Chat Interface
  |
  v
STOMP Client
  |
  v
WebSocket Connection
  |
  v
Spring Boot WebSocket Handler
  |
  +-----------> MongoDB
  |
  v
STOMP Message Delivery
  |
  v
Connected Chat Clients
```

## Getting Started

### Prerequisites

Install the following:

* Java 17 or later
* Maven
* Node.js
* npm
* MongoDB
* Git

## Clone the Repository

```bash
git clone https://github.com/AniketMatte21/Group-Chat-Platform.git

cd Group-Chat-Platform
```

## Backend Setup

Navigate to the backend:

```bash
cd chat-backend
```

Configure your MongoDB connection in the application's configuration.

Then start the Spring Boot application:

```bash
mvn spring-boot:run
```

Or, if using the Maven wrapper:

### Windows

```bash
mvnw.cmd spring-boot:run
```

### Linux / macOS

```bash
./mvnw spring-boot:run
```

## Frontend Setup

Open another terminal and navigate to:

```bash
cd chat-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is configured as a Vite application.

## MongoDB Configuration

The backend uses MongoDB for persistent chat data.

Make sure MongoDB is running locally or provide the connection details for your MongoDB deployment.

Example configuration:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/group-chat
```

Use your actual database configuration rather than committing credentials or sensitive connection strings to GitHub.

## WebSocket Communication

The application uses the following technologies for real-time communication:

```text
React
  |
  v
STOMP.js
  |
  v
SockJS / WebSocket
  |
  v
Spring WebSocket
  |
  v
STOMP Message Broker
  |
  v
Chat Application
```

This architecture enables messages to be delivered to connected clients in real time without requiring continuous HTTP polling.

## Why This Project?

This project demonstrates practical implementation of real-time full-stack communication using WebSocket technologies.

It provides hands-on experience with:

* Spring Boot
* WebSocket communication
* STOMP messaging
* MongoDB
* React
* Vite
* REST and real-time communication concepts
* Frontend-backend integration
* Real-time application development

## Learning Outcomes

Through this project, the following concepts are demonstrated:

* Building a full-stack application
* Implementing real-time communication
* Integrating React with Spring Boot
* Working with WebSocket connections
* Using STOMP for message routing
* Persisting application data using MongoDB
* Managing frontend state and communication
* Structuring independent frontend and backend applications

## Deployment

The project includes a deployed frontend application:

**Live Application:**
https://group-chat-platform.vercel.app/

The GitHub repository lists the deployed frontend under its project information.

## Future Enhancements

Potential improvements include:

* User authentication and authorization
* Private one-to-one messaging
* Chat room creation and management
* Online/offline user presence
* Message read status
* Typing indicators
* Message reactions
* File and image sharing
* Message search
* Push notifications
* Docker-based deployment
* Production WebSocket configuration

## Author

**Aniket Matte**

Computer Engineering
Sinhgad Institute of Technology and Science, Pune

GitHub:
https://github.com/AniketMatte21

## License

This project is currently intended for educational and portfolio purposes.
