// Import Home model.
// Used to perform all Home-related operations.
const Home = require("../models/home");


// ======================================================
// Controller: Show Add Home Page
// Route: GET /host/add-home
// ======================================================
exports.addHome = (req, res, next) => {

  // Render the Add/Edit Home page.
  // editing = false tells the EJS page that
  // this is an "Add Home" operation.
  res.render("host/editHome", {
    pageTitle: "Add Home",
    editing: false,
    isLoggedIn: req.isLoggedIn, // Pass the isLoggedIn flag to the view
    user: req.session.user // Pass the user object to the view
  });

};


// ======================================================
// Controller: Show Edit Home Page
// Route: GET /host/editHome/:id
// ======================================================
exports.getEditHome = async (req, res, next) => {

  try {

    // Get Home ID from URL.
    const id = req.params.id;

    // Read editing flag from query string.
    const editing = req.query.editing === "true";

    // Find the requested home.
    const home = await Home.findById(id);

    // If home doesn't exist, redirect.
    if (!home) {
      console.log("Home not found for editing!!");
      return res.redirect("/host/hostHomeList");
    }

    // Render Edit Home page.
    res.render("host/editHome", {
      pageTitle: "Edit Home",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn ,// Pass the isLoggedIn flag to the view
      user: req.session.user // Pass the user object to the view
    });

  } catch (err) {
    console.error(err);
    res.redirect("/host/hostHomeList");
  }

};


// ======================================================
// Controller: Add New Home
// Route: POST /host/add-home
// ======================================================
exports.postAddHome = async (req, res, next) => {

  try {

    // Read submitted form data.
    const { houseName, location, pricePerNight, description } = req.body;

    console.log(req.file); // Log the uploaded file information
    if(!req.file) {
      return res.status(400).send("No file uploaded. Please upload a photo.");
    }
    const photo = req.file.path; // Get the filename of the uploaded photo

    // Create Home object.
    const home = new Home({
      houseName,
      location,
      pricePerNight,
      photo,
      description,
    });

    // Save Home.
    await home.save();

console.log("Saved successfully:", home);

    // Show confirmation page.
    res.render("host/homeAdded", {
      pageTitle: "Home Added",
      isLoggedIn: req.isLoggedIn, // Pass the isLoggedIn flag to the view
      user: req.session.user // Pass the user object to the view
    });

  } catch (err) {
    console.error(err);
    res.redirect("/host/add-home");
  }

};


// ======================================================
// Controller: Delete Home
// Route: POST /host/deletehome/:id
// ======================================================
exports.postdeleteHome = async (req, res, next) => {

  try {

    // Read Home ID from URL.
    const homeid = req.params.id;

    // Delete Home.
    await Home.findByIdAndDelete(homeid);
 
    // Redirect to Host Home List.
    res.redirect("/host/hostHomeList");

  } catch (err) {
    console.error(err);
    res.redirect("/host/hostHomeList");
  }

};


// ======================================================
// Controller: Update Existing Home
// Route: POST /host/edit-home
// ======================================================
exports.postEditHome = async (req, res, next) => {
  try {
    const { id, houseName, location, pricePerNight, description } = req.body;

    Home.findById(id)
      .then((home) => {
        home.houseName = houseName;
        home.location = location;
        home.pricePerNight = pricePerNight;
        home.description = description;

        // Update photo only if a new one is uploaded
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
// ======================================================
// Controller: Display Host's Home List
// Route: GET /host/hostHomeList
// ======================================================
exports.getHostHomeList = async (req, res, next) => {

  try {

    // Fetch all homes.
    const registeredHomes = await Home.find();
    console.log(req.isLoggedIn);

    // Render Host Home List page.
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      isLoggedIn: req.isLoggedIn, // Pass the isLoggedIn flag to the view
      user: req.session.user // Pass the user object to the view
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }

};