
const express = require("express");

const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getHomes);
storeRouter.get("/bookings", storeController.getbookings);
storeRouter.get("/favoriteList", storeController.getfavoriteList);
storeRouter.get('/homeDetail/:id', storeController.getHomeDetail);
storeRouter.post("/favorites", storeController.postAddToFavorites);

// removed legacy route that duplicated the /store mount path

module.exports = storeRouter;