
const path = require("path");
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
// Import Express framework.
// Express helps us create web servers and define routes easily.
const express = require("express");
const multer = require("multer");
require("dotenv").config();

// In Express, the app object is the central control hub of your server. You use it to handle incoming requests, set up routes, and start the application.
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the 'uploads' directory


const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// used to save images uploaded by the user to the server's file system. The 'dest' option specifies the directory where uploaded files will be stored.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename : (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
    cb(null, true); // true is returned when the file type is allowed. This will allow the file to be saved.
  }else{
    cb(null, false); // false is returned when the file type is not allowed. This will prevent the file from being saved.
  }
};
    

const multerOptions = {
  storage: storage,
  fileFilter: fileFilter
};


// Tell Express to use EJS as the template engine.
app.set("view engine", "ejs");
// Tell Express that all EJS files are inside the 'views' folder.
app.set('views' , 'views');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});
  

// Make everything inside the 'public' folder accessible to the browser.
app.use(express.static(path.join(__dirname, "public")));

const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const {hostRouter} = require("./routes/hostRouter");
const storeController = require("./controllers/storeController");

const {default: mongoose} = require("mongoose");

const get404 = require("./controllers/errorController").get404;

// Parse form data
app.use(express.urlencoded({ extended: true }));//true means Express can parse complex, nested data structures (like objects inside objects, or lists/arrays inside objects) sent from your forms.
app.use(multer(multerOptions).single("photo"));

app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with a strong secret key in production
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use((req, res, next) => {
  req.isLoggedIn = Boolean(req.session && req.session.isLoggedIn);
  next();
});
// Global middleware
app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/auth", authRouter);

// Store routes
app.use("/store", storeRouter);

app.use("/host", (req, res, next) => {
  if(!req.isLoggedIn) {
    console.log("User not logged in. Redirecting to login page.");
    return res.redirect("/auth/login");
  }
  next();
});

// Host routes
app.use("/host", hostRouter);

// Root route: show the public index page when logged out, and the home page when logged in
app.get('/', storeController.getHomes);

// 404 handler
app.use(get404);


// Connect the database BEFORE starting the server.
//
// Why?
// - Most API routes (GET, POST, PUT, DELETE) depend on the database.
// - If the server starts first, users can send requests immediately.
// - Without a database connection, those requests will fail,
//   causing errors, failed responses, and a poor user experience.
//
// Fail Fast Principle:
// - If the database connection fails, don't start the server.
// - It's better for the application to fail during startup than
//   to run in a broken state and fail on every database request.
//
// Startup Order (recommended):
// 1. Load Configuration (.env)
// 2. Connect to Database
// 3. Register Middleware
// 4. Register Routes
// 5. Start Listening for Requests
//
// Remember:
// - A running server doesn't always mean a healthy application.
// - The server should accept requests only when all critical
//   services (Database, Cache, External APIs, etc.) are ready.
// - This is a standard production-level backend practice.

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose Connected");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongoose Connection Error:", err);
  });