// Import Home model.
// Used to fetch all homes and details of a specific home.
const Home = require("../models/home");

// Import Favorites model.
// Used to add and retrieve favorite homes.
const Favorites = require("../models/favorites");


// ========================================================
// Controller: Display all homes
// Route: GET /store
// ========================================================
exports.getHomes = async (req, res, next) => {

  try {

    // Fetch all homes from the model.
    const registeredHomes = await Home.find();

    if (!req.isLoggedIn) {
      return res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Home",
        isLoggedIn: false,
        user : req.session.user,
      });
    }

    // Render the Home List page and pass the fetched homes.
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home",
      isLoggedIn: true,
      user : req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }

};


// ========================================================
// Controller: Display Bookings page
// Route: GET /store/bookings
// ========================================================
exports.getbookings = async (req, res, next) => {

  try {

    // Fetch all homes.
    const registeredHomes = await Home.find();

    // Render Bookings page.
    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "Bookings",
      isLoggedIn: req.isLoggedIn ,// Pass the isLoggedIn flag to the view
      user : req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }

};


// ========================================================
// Controller: Display Favorite Homes
// Route: GET /store/favoriteList
// ========================================================
exports.getfavoriteList = async (req, res, next) => {
  try {
    const favorites = await Favorites.find().populate("homeId");

    const favoriteHomes = favorites
      .map((fav) => fav.homeId)
      .filter((home) => home !== null && home !== undefined);

    res.render("store/favoriteList", {
      registeredHomes: favoriteHomes,
      pageTitle: "Favorite List",
      isLoggedIn: req.isLoggedIn ,// Pass the isLoggedIn flag to the view
      user : req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

// ========================================================
// Controller: Display details of one home
// Route: GET /store/homeDetail/:id
// ========================================================
exports.getHomeDetail = async (req, res, next) => {

  try {

    // Get Home ID from URL.
    const homeId = req.params.id;

    // Fetch the requested home.
    const home = await Home.findById(homeId);

    // If found, render Home Details page.
    if (home) {

      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Home Details",
        isLoggedIn: req.isLoggedIn ,// Pass the isLoggedIn flag to the view
        user : req.session.user,
      });

    }

    // Otherwise redirect to Home page.
    else {

      res.redirect("/store");

    }

  } catch (err) {
    console.error(err);
    res.redirect("/store");
  }

};


// ========================================================
// Controller: Add Home to Favorites
// Route: POST /store/favorites
// ========================================================
exports.postAddToFavorites = async (req, res, next) => {
  try {
    const homeId = req.body.id;

    console.log("Add to favorites:", homeId);

    // Check if already in favorites
    const existingFavorite = await Favorites.findOne({ homeId });

    if (!existingFavorite) {
      const favorite = new Favorites({
        homeId,
      });

      await favorite.save();
      console.log("Added to favorites");
    } else {
      console.log("Already in favorites");
    }

    res.redirect("/store");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

// ================= Controller Responsibilities =================
//
// A Controller should:
// - Receive the request from the Router.
// - Read request data (req.params, req.body, req.query).
// - Call Models/Services to perform work.
// - Process returned data if needed.
// - Send a response (render, redirect, or JSON).
//
// A Controller should NOT:
// - Define routes.
// - Manage database connections.
// - Contain complex business logic.
// - Write raw database queries.
//
// Flow:
// Router -> Controller -> Model -> View/Response
// ===============================================================34r232