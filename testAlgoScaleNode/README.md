# Local Authentication and CRUD API

This project is a simple CRUD (create, read, update, delete) API using Node.js/Django that implements a local authentication strategy, allowing users to log in with a username and password.

## Features

- Create, read, update, and delete a "Task" resource
- Each task has a name (required), description (optional), due date (required), and status (completed or pending)
- All routes in the application are protected, only authenticated users can access them

## API Routes

### POST /tasks

Create a new task

### GET /tasks

Get a list of all tasks

### GET /tasks/:id

Get a specific task by ID

### PUT /tasks/:id

Update a specific task by ID

### DELETE /tasks/:id

Delete a specific task by ID

## Installation

1. Clone the repository: `git clone https://github.com/dsquare0601/challenges.git`
2. Go to dir `cd .\challenges\testAlgoScaleNode\`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
