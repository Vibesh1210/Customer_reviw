
# Customer Manager App

## Overview
This is a MERN stack-based Customer Management Application that allows users to:
- Register and login using JWT-based authentication.
- Add customers and manage their information such as name, phone number, pending amount, and photo.
- View all the customers, including their details and pending amounts.
- Add transactions for each customer and update the pending amount.
- Display a history of transactions for each customer.

## Features
- User registration and login with bcrypt password hashing.
- JWT-based authentication.
- MongoDB for storing user and customer information.
- Add transactions for each customer, updating their pending amount.
- View customer details and transactions on a separate page.
- File upload functionality to add customer profile photos.
- Responsive UI built with React and styled using modern CSS techniques.

## Tech Stack
- **Frontend**: React, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **File Upload**: Multer

## Installation

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or local MongoDB instance

### Backend Setup
1. Clone this repository.
    ```bash
    git clone <repo-url>
    ```
2. Install backend dependencies.
    ```bash
    cd backend
    npm install
    ```
3. Create a `.env` file and add the following:
    ```
    SECRET=your-jwt-secret
    MONGODB_URI=your-mongodb-uri
    ```
4. Run the backend server.
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory.
    ```bash
    cd frontend
    ```
2. Install frontend dependencies.
    ```bash
    npm install
    ```
3. Run the frontend development server.
    ```bash
    npm start
    ```

### Usage
1. Register as a new user.
2. Add customers with their name, phone number, pending amount, and photo.
3. View the list of customers and their pending amounts.
4. Click on a customer's name to view their transaction history.
5. Add new transactions for a customer, and the pending amount will be updated accordingly.

## API Endpoints

### Authentication
- `POST /register`: Register a new user.
- `POST /login`: Log in and receive a JWT.

### Customers
- `POST /add`: Add a new customer (with file upload for the profile photo).
- `GET /all`: Retrieve all customers for the logged-in user.
- `POST /transactions`: Add a transaction for a customer.

### Transactions
- `GET /transactions/:customerId`: Retrieve all transactions for a specific customer.

## Screenshots
### 1. Transaction History Page
![Customer List](./Manager/screenshot/Screenshot%20(116).png)

### 2. Add Customer Form
![Add Customer](./Manager/screenshot/Screenshot%20(117).png)

### 3. Register Form
![Add Customer](./Manager/screenshot/Screenshot%20(118).png)

## License
This project is licensed under the MIT License.
"""

# Saving the README content to a file
readme_file_path = '/mnt/data/README.md'
with open(readme_file_path, 'w') as readme_file:
    readme_file.write(readme_content)

readme_file_path
