const Home = require("../models/home");

exports.addHome = (req, res, next) => {

  res.render("host/editHome", {
    pageTitle: "Add Home",
    editing: false,
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user 
  });

};

exports.getEditHome = async (req, res, next) => {

  try {

    const id = req.params.id;

    const editing = req.query.editing === "true";

    const home = await Home.findById(id);

    if (!home) {
      console.log("Home not found for editing!!");
      return res.redirect("/host/hostHomeList");
    }

    res.render("host/editHome", {
      pageTitle: "Edit Home",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn ,
      user: req.session.user 
    });

  } catch (err) {
    console.error(err);
    res.redirect("/host/hostHomeList");
  }

};


exports.postAddHome = async (req, res, next) => {

  try {
    const { houseName, location, pricePerNight, description } = req.body;

    console.log(req.file); 
    if(!req.file) {
      return res.status(400).send("No file uploaded. Please upload a photo.");
    }
    const photo = req.file.path; 

    const home = new Home({
      houseName,
      location,
      pricePerNight,
      photo,
      description,
    });

    await home.save();

console.log("Saved successfully:", home);

    res.render("host/homeAdded", {
      pageTitle: "Home Added",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user 
    });

  } catch (err) {
    console.error(err);
    res.redirect("/host/add-home");
  }

};


exports.postdeleteHome = async (req, res, next) => {

  try {

    const homeid = req.params.id;

    await Home.findByIdAndDelete(homeid);
 
    res.redirect("/host/hostHomeList");

  } catch (err) {
    console.error(err);
    res.redirect("/host/hostHomeList");
  }

};


exports.postEditHome = async (req, res, next) => {
  try {
    const { id, houseName, location, pricePerNight, description } = req.body;

    Home.findById(id)
      .then((home) => {
        home.houseName = houseName;
        home.location = location;
        home.pricePerNight = pricePerNight;
        home.description = description;

        if (req.file) {
          home.photo = req.file.path;
        }

        return home.save();
      })
      .then(() => {
        res.redirect("/host/hostHomeList");
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/host/hostHomeList");
      });

  } catch (err) {
    console.error(err);
    res.redirect("/host/hostHomeList");
  }
};

exports.getHostHomeList = async (req, res, next) => {

  try {

    const registeredHomes = await Home.find();
    console.log(req.isLoggedIn);

    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user 
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }

};