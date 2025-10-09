# E-Commerce Web Application

A comprehensive full-stack web application for managing online shopping experiences, built with **Spring Boot** and **React**.

## Overview

The **E-Commerce Web Application** is designed to simplify and enhance the process of online shopping. It provides a seamless interface for customers to browse products, manage carts, and place orders — while enabling administrators to efficiently manage products, users, and sales data.

## Features

### User Features
- User registration and authentication with JWT  
- Browse products by category and search functionality  
- Add/remove items from the shopping cart  
- Place and track orders  
- View order history and account details  
- Responsive and intuitive user dashboard  

### Admin Features
- Admin dashboard with sales insights  
- Manage products (add, edit, delete)  
- Manage categories and inventory  
- Manage users and view order details  
- Configure store settings and offers  

## Technology Stack

### Backend
- Java 21  
- Spring Boot 3.2.2  
- Spring Security with JWT Authentication  
- Spring Data MongoDB  
- Maven for dependency management  

### Frontend
- React 18  
- React Router for page navigation  
- Material-UI for modern and responsive UI design  
- Axios for REST API communication  

### Database
- MongoDB  

## Setup and Installation

### Prerequisites
- Java 21  
- Node.js and npm  
- MongoDB  

### Backend Setup
1. Clone the repository  
2. Navigate to the backend directory  
3. Run `mvn clean install` to build the project  
4. Run `mvn spring-boot:run` to start the backend server  

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`  
2. Install dependencies: `npm install`  
3. Start the development server: `npm start`  

### Database Configuration
The application is configured to connect to a MongoDB database.  
Update the `application.properties` file with your MongoDB connection details if needed:

```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=ecommerce_app
