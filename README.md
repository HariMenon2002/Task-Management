# Task Management Webapp
This is a [Next.js](https://nextjs.org) which helps in creating, updating,deleting and viewing tasks. It also includes Signin and Signup authentication.

## Getting Started

First clone the project, enter the environment variables and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Technologies used

* Next.js
* React
* MongoDB Atlas
* TypeScript
* Tailwind CSS

## Working  
The app/(auth) folder has the signin and signup component. Both of them fetch data using the api in api folder and displays error if occured. After successful signin, it routes to the main tasks page.  

The app/api folder has the necessary REST apis to perform the CRUD operations.

The app/tasks folder is where the tasks can be seen, added, updated and deleted.
The components folder has certain components which are used in the project like Header, Sign out etc.

The lib folder is where the mongodb schema is defined for both users and the tasks. It also consists of mongoose.ts which is used to establish connection with database. The folder lib/utils is for authentication checking and middlewares.

The .env.example file has the environment variables used in this project. 

**NOTE**: The UI is done in such a way that after signing in, all the tasks will be displayed with each task having an edit and delete button. The page will also have an add task button. If you click on each task's name, it will give detailed view of the task.

JWT token is used for authentication.

## API Documentation
The app/api folder mainly deals with APIs used in this project.

* api/auth/login - Handles POST request to signin the user by verifying with the database. It also sets and stores the jwt token in local storage.
* api/auth/register - Handles POST request to validate and register the username and password in the database. It also involves regex expressions which ensures username to be alphanumeric with 3-30 characters and password to be atleast 8 characters with atleast 1 capital and 1 small letter and 1 special character.

For the above apis, {username:string,password:string} is the body for the POST request.  

For the below apis, authorization header must be set to Bearer {jwt_token} if doing explicitly. {jwt_token} will be sent as response if api/auth/login is successful.

* api/tasks - Handles both GET and POST request. GET request is to display all the tasks, POST request is to add a task. {title:string,description:string,completed:boolen} is the format of the body for POST request

* api/tasks/[id]- A dynamic route which handles GET, PUT and DELETE requests which is for a single task. GET is to get details of a single task, PUT is to edit the task and DELETE is for deletion of the task.

All APIs have been tested using Thunderclient which is a VS Code extension.

## Deploy on Vercel

This Next.js app has been deployed on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Link for the project is [link](https://task-management-taupe-seven.vercel.app/signin)
