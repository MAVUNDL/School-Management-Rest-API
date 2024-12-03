# School Management API
![image](https://github.com/user-attachments/assets/77108e79-653e-465b-935a-afca53d3cf2c)
This is a backend API for managing school data, including school information, number of teachers, and number of learners. It is built using Node.js and PostgreSQL.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [License](#license)

## Project Overview

This project provides an API to manage school records in a PostgreSQL database. The API supports creating, retrieving, and updating school data, including managing the number of teachers and learners. The API is built using Node.js, Express, and PostgreSQL.
![image](https://github.com/user-attachments/assets/6e119ce1-1075-47c1-85a7-15c27557d809)
![image](https://github.com/user-attachments/assets/bd324cc4-4b9a-4209-9c8d-3403aca2766a)
![image](https://github.com/user-attachments/assets/201b677d-bee5-4195-8bc7-bfa00186afce)
![image](https://github.com/user-attachments/assets/594520e2-6143-4739-8ca9-df687b3770ab)

## Installation

To get started with this project, you'll need to clone the repository and install the necessary dependencies. Ensure you have node.js in your device.

### Clone the repository:

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
npm install

```

## Database Setup

The project includes a backup file (`schools.sql`) to restore the database locally. Follow these steps to set up your PostgreSQL database:

### Install PostgreSQL:

- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org).

### Create a Database:

- Open your PostgreSQL terminal (e.g., `psql`) and run the following command to create a new database:

  ```sql
  CREATE DATABASE schools;

  ````
## Restore the Backup:
 Restore the schools.sql backup into the newly created database:
```
  psql -U <your-username> -d schools -f schools.sql
```
- Replace <your-username> with your PostgreSQL username.

### Verify the Restoration:
Connect to the database and check if the tables and data are properly restored:
```
 psql -U <your-username> -d schools \dt
```
- This should list all the tables in the schools database.

### Configuration
Set up environment variables to connect the API to your local PostgreSQL database. Create a .env file in the root directory with the following content:

```
  CONNECTIONSTRING=postgresql://<your-username>:<your-password>@localhost:5432/schools
  Replace <your-username> and <your-password> with your PostgreSQL credentials.
```
## API Endpoints
Below are the key endpoints provided by the API. Use tools like Postman to interact with them.

### Get All Schools:
```
 URL: /api/v1/schools
 Method: GET
```
### Get School by EMIS Number:
```
 URL: /api/v1/school/:natemis
 Method: GET
```
### Add a School:
```
 URL: /api/v1/school
 Method: POST
```
### Update Number of Teachers/Learners:
```
 URL: /api/v1/school/:natemis
 Method: PUT
```
## Running the Application
To start the server locally, use the following command:
```
 node server.js
```
- The API will be available at http://localhost:3000.
