# Project1

> **Note:** This project was made for practicing backend development.

## Overview

Project1 is a property rental web application built with Node.js, Express, and MongoDB. It supports user authentication, host-managed home listings, favorites, image uploads, and server-rendered views using EJS.

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- EJS templates
- Tailwind CSS
- Multer for file uploads
- bcryptjs for password hashing
- express-session for session management
- connect-mongodb-session for storing sessions in MongoDB
- dotenv for environment configuration

## Architecture

- `app.js` - Main application entry point that configures middleware, sessions, routes, and database connection.
- `routes/` - Express routers that define routing and connect requests to controllers.
  - `authRouter.js` - Login, signup, and logout endpoints.
  - `storeRouter.js` - Home browsing, favorite list, bookings, and detail pages.
  - `hostRouter.js` - Host-only page routes for adding, editing, and deleting homes.
- `controllers/` - Request handlers that implement business logic and render views.
  - `authController.js` - Authentication and signup flow.
  - `storeController.js` - Public home listing, home details, favorites, and bookings.
  - `hostcontroller.js` - Host dashboard operations for managing homes.
  - `errorController.js` - 404 page handling.
- `models/` - Mongoose schemas for application data.
  - `user.js` - User accounts with roles and hashed passwords.
  - `home.js` - Property listing details.
  - `favorites.js` - Favorite homes with a reference to `Home`.
- `views/` - EJS templates for rendering pages.
- `public/` - Static assets like compiled CSS.
- `uploads/` - Stored uploaded home photos.

## Features

- User signup and login
- User role selection: `guest` or `host`
- Secure password hashing with `bcryptjs`
- Session-based authentication with MongoDB session storage
- Browse available homes and view details
- Add homes with image uploads
- Edit and delete host listings
- Mark homes as favorites
- Bookings page display
- Custom 404 page
- Responsive UI styled with Tailwind CSS

## Environment Variables

Create a `.env` file with the following values:

```env
MONGODB_URI=<your mongodb connection string>
SESSION_SECRET=<your session secret>
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/airbnb
SESSION_SECRET=my-secret-key
```

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build Tailwind CSS:
   ```bash
   npm run build
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open the app in your browser at `http://localhost:3000`

## Notes

- **This project was built purely for practicing backend development.**
- The app uses EJS server-side rendering instead of a separate frontend framework.
- Uploaded images are stored in `uploads/` and served statically from `/uploads`.
- Hosts can add homes, and guests can browse homes and add favorites.

## Folder Structure

- `app.js`
- `controllers/`
- `models/`
- `routes/`
- `views/`
- `public/`
- `uploads/`
- `package.json`
- `.env`

## License

ISC
