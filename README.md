Overview
- This application provides a small nodejs and nextjs app for managing blog posts, orders, and user schedules.
- It is designed to handle creating and managing blog posts, allowing authenticated users to comment on them.
- Additionally, the application includes basica creating and filtering orders, with support for exporting data to XLSX and XML formats.
- Furthermore, there is a scheduler feature for managing user tasks, which allows users to select and manage their weekly schedules through an intuitive calendar interface.

Structure
- server.ts
- The main entry point of the application, this file initializes the server, sets up middleware such as CORS and error handling, and configures the routes.

Controllers
- Controllers are responsible for handling incoming requests. They validate the input, interact with the services to process the data, and return the appropriate responses.

Services
- Services contain the business logic of the application. They orchestrate operations, manage complex processes, and interact with repositories to fetch or persist data.

Repositories
- Repositories interface with the database. They encapsulate queries and data manipulation logic, ensuring that the data access layer is abstracted from the rest of the application.

Entities
Entities represent the database models, defining their structure and relationships using TypeORM.

Interfaces
- Interfaces define the data structures and contracts used across different parts of the application, ensuring type safety and consistency.

Error Handling
- The application includes custom error classes and middleware to manage and respond to errors gracefully.

JWT Authentication
- JWT (JSON Web Token) is used for authentication and authorization, securing endpoints and managing user sessions.

Features
- Blog Management
- Create Blog Posts: Users can create and manage blog posts.
- Comments: Authenticated users can comment on blog posts.

Order Management
- Create Orders: Users can create simple orders.
- Filter Orders: Fetch orders using various filters such as date range, order number, customer, and total amount.
- Export Orders: Export orders to XLSX and XML formats.

User Scheduler
- Manage Schedule: Select a user and manage their weekly schedule.
- Task Management: Create, update, and edit tasks, all visible in a nicely integrated calendar component.

Installation
- Clone the repository
- Navigate to the project directory
- Install server side dependencies: npm install
- Navigate to the client directory
- Install client side dependencies: npm install
- Set up the environment variables: Create a .env file and create new db, configure it and also JWT settings in the env file

Start the application:
- server - npm run dev -> http://localhost:8800
- client - npm run dev -> http://localhost:3000
