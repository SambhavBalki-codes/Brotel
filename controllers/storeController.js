const Home = require("../models/home");

const Favorites = require("../models/favorites");


exports.getHomes = async (req, res, next) => {

  try {

    const registeredHomes = await Home.find();

    if (!req.isLoggedIn) {
      return res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "Home",
        isLoggedIn: false,
        user : req.session.user,
      });
    }

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


exports.getbookings = async (req, res, next) => {

  try {

    const registeredHomes = await Home.find();

    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "Bookings",
      isLoggedIn: req.isLoggedIn ,
      user : req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }

};


exports.getfavoriteList = async (req, res, next) => {
  try {
    const favorites = await Favorites.find().populate("homeId");

    const favoriteHomes = favorites
      .map((fav) => fav.homeId)
      .filter((home) => home !== null && home !== undefined);

    res.render("store/favoriteList", {
      registeredHomes: favoriteHomes,
      pageTitle: "Favorite List",
      isLoggedIn: req.isLoggedIn ,
      user : req.session.user,
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

exports.getHomeDetail = async (req, res, next) => {

  try {

    const homeId = req.params.id;

    const home = await Home.findById(homeId);

    if (home) {

      res.render("store/homeDetail", {
        home: home,
        pageTitle: "Home Details",
        isLoggedIn: req.isLoggedIn ,
        user : req.session.user,
      });

    }

    else {

      res.redirect("/store");

    }

  } catch (err) {
    console.error(err);
    res.redirect("/store");
  }

};


exports.postAddToFavorites = async (req, res, next) => {
  try {
    const homeId = req.body.id;

    console.log("Add to favorites:", homeId);

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