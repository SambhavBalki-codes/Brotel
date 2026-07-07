const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true
  }
});

module.exports = mongoose.model("Favorites", favoritesSchema);
// module.exports = class Favorites {
//   static addToFavorites(homeId, callback) {
//     const db = getDb();

//     db.collection("favorites")
//       .findOne({ owner: "default" })
//       .then((favoriteDoc) => {
//         const favoriteIds = favoriteDoc?.homeIds || [];
//         if (!favoriteIds.includes(homeId)) {
//           favoriteIds.push(homeId);
//         }

//         return db.collection("favorites").updateOne(
//           { owner: "default" },
//           { $set: { homeIds: favoriteIds } },
//           { upsert: true }
//         );
//       })
//       .then(() => {
//         callback();
//       })
//       .catch((err) => {
//         console.error("Error adding favorite:", err);
//         callback();
//       });
//   }

//   static getallFavorites(callback) {
//     const db = getDb();

//     db.collection("favorites")
//       .findOne({ owner: "default" })
//       .then((favoriteDoc) => {
//         callback(favoriteDoc?.homeIds || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching favorites:", err);
//         callback([]);
//       });
//   }
// };