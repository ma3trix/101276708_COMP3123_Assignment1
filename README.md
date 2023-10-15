# COMP 3123 Full Stack Development - Assignment 1

## Assignment Overview

This is the README file for Assignment 1 in COMP 3123 - Full Stack Development. In this assignment, you will be developing a Backend application using NodeJS, Express, and MongoDB. Your task is to create a set of RESTful APIs that accept and return data in JSON format. You will also be using GitHub for version control and will commit and push all your code to the "Student#_COMP3123_Assignment1" repository.

## Assignment Details

### Submission Deadline
- **Submission Date:** Sunday, 15th Oct 2023
- **Submission Time:** 11:59 PM (Week 06)

### Task Description

As a newly hired Junior Software Engineer, you are tasked with developing the following APIs using NodeJS, Express, and MongoDB:

#### User Management APIs

1. **POST** `/api/v1/user/signup`
   - **Response Code:** 201
   - **Description:** Allow users to create a new account.

2. **POST** `/api/v1/user/login`
   - **Response Code:** 200
   - **Description:** Allow users to log in to the system.

#### Employee Management APIs

3. **GET** `/api/v1/emp/employees`
   - **Response Code:** 200
   - **Description:** Retrieve a list of all employees.

4. **POST** `/api/v1/emp/employees`
   - **Response Code:** 201
   - **Description:** Create a new employee record.

5. **GET** `/api/v1/emp/employees/{eid}`
   - **Response Code:** 200
   - **Description:** Retrieve employee details by employee ID.

6. **PUT** `/api/v1/emp/employees/{eid}`
   - **Response Code:** 200
   - **Description:** Update employee details.

7. **DELETE** `/api/v1/emp/employees?eid=xxx`
   - **Response Code:** 204
   - **Description:** Delete an employee by employee ID.

### Sample Error Response

```json
{
  "status": false,
  "message": "Invalid Username and password"
}
```

### Sample Request Payload for Login

```json
{
  "username": "p@p.com",
  "password": "password$123"
}
```

### Sample Request Payload for Successful Login

```json
{
  "status": true,
  "username": "p@p.com",
  "message": "User logged in successfully",
  "jwt_token": "Optional implementation"
}
```

### Sample Request Payload for Employee

```json
{
  "first_name": "Tam",
  "last_name": "Harrow",
  "email": "tam@hollywood.com",
  "gender": "Male",
  "salary": 125500.00
}
```

### MongoDB Database

- **Database Name:** comp3123_assignment1

#### Users Collection

- **_id:** Object ID (Auto Generate)
- **username:** String (100) - Primary Key
- **email:** String (50) - Unique
- **password:** String (50) - May be encrypted with other fields

Users can log in using either username or email and a password.

#### Employee Collection

- **_id:** Object ID (Auto Generate)
- **first_name:** String (100) - Required
- **last_name:** String (50) - Required
- **email:** String (50) - Unique
- **gender:** String (25) - Male/Female/Other
- **salary:** Float - Required

### Notes

- Utilize `express.Routes()` and modules for a modular code structure.
- Validate the data whenever required to ensure data integrity.
- Return error details or success response details in JSON format as needed.
- Apply JWT security concept optionally to secure your API calls.
- Late submissions will not be accepted.

Good luck with your assignment! If you have any questions or need assistance, feel free to reach out.
