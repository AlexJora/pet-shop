# Pet Shop

## Description

This project is an eCommerce website built with the MERN stack (MongoDB, Express.js, React.js, and Nodejs).

## Screenshots

<!-- Add screenshots here -->

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)
- [Status](#status)
- [Sources](#sources)

## Technologies

- **Frontend:**
  - React
  - React Router Dom
  - Redux Toolkit
  - React Bootstrap

- **Backend:**
  - Node.js
  - Express

- **Database:**
  - MongoDB Atlas
  - Compass

- **ODM (Object Data Modeling):**
  - Mongoose is used to define data models using a schema-based approach, simplifying interactions with the database.

- **Security:**
  - Authentication and Authorization: JWT authentication (JSON web tokens) with HTTP-Only cookie
  - Role Management: Assign specific roles to users, specifying their permitted actions and areas of application access.
  - Password Security: Hashing with Bcrypt.

## Features

- **Shopping Cart:** Provide a shopping cart feature for users to collect items for purchase.
- **Product Reviews and Ratings:** Allow users to submit product reviews and ratings.
- **Top Products Carousel:** Showcase a dynamic carousel displaying top-rated or featured products.
- **Product Pagination:** Enhance user experience with pagination for product listings.
- **Product Search Feature:** Enable users to search for specific products, enhancing usability.
- **User Profile with Orders:** Offer users the ability to view their profiles and track their order history.
- **Admin Product Management:** Provide administrators with tools to manage product listings.
- **Admin User Management:** Empower administrators to manage user accounts.
- **Admin Order Details Page:** Offer detailed order information and management for administrators.
- **Mark Orders as Delivered:** Grant the ability to mark orders as delivered, aiding in order fulfillment and tracking.
- **Checkout Process:** Guide users through a seamless checkout process, including options for shipping and payment methods.
- **PayPal/Credit Card Integration:** Integrate payment gateways, such as PayPal and credit card processing, for secure transactions.
- **Database Seeder:** Automatically populate the database with sample products and users for testing and demonstration purposes.

## Setup

**1. Create a MongoDB database and obtain your MongoDB URI** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  

**2. Create a PayPal account and obtain your Client ID** - [PayPal Developer](https://developer.paypal.com/)  

**3. Env Variables**:
```dotenv

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = ''
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
``` 
**4. To install project dependencies for both the frontend and backend**, use the following commands:
```dotenv
npm install
cd frontend
npm install
```
**5. Running the Project**
You can run the project in two ways:

To run both the frontend and backend concurrently (frontend on port 3000 and backend on port 5000):
```dotenv
npm run dev
```
To run the backend only:
```dotenv
npm run server
```
**6. Building & Deployment**
To create a production build of the frontend, navigate to the frontend directory and run:
```dotenv
cd frontend
npm run build
```
**7. Seeding the Database**
You can seed the database with sample users and products or destroy all data using the following commands:

To import data:

```dotenv
npm run data:import
```
To destroy data:
```dotenv
npm run data:destroy
```
**8. Sample User Logins**
    
Email: admin@email.com

Password: 123456


Email: john@email.com  

Password: 123456  

## Status  
In progress
## Sources  
This project was based on Udemy course MERN From Scratch 2023 | eCommerce Platform   
Many thanks to Brad Traversy!




