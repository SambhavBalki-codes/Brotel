// Import Express framework.
const express = require("express");

// Create a new Router object.
// A Router helps organize related routes instead of writing
// everything inside app.js.
const hostRouter = express.Router();

const hostController = require("../controllers/hostcontroller");

// Display Add Home page.
// Actual URL:
// /host/add-home
hostRouter.get("/add-home", hostController.addHome);

// Display list of homes added by the host.
// Actual URL:
// /host/hostHomeList
hostRouter.get("/hostHomeList", hostController.getHostHomeList);

// Display edit page for a specific home.
// ':id' is a Route Parameter.
// Example:
// /host/editHome/64fa89d...
hostRouter.get("/editHome/:id", hostController.getEditHome);



// ===================== POST Routes =====================

// Handle Add Home form submission.
hostRouter.post("/add-home", hostController.postAddHome);

// Handle Edit Home form submission.
hostRouter.post("/edit-home", hostController.postEditHome);

// Delete a specific home.
// ':id' tells Express which home should be deleted.
hostRouter.post("/deletehome/:id", hostController.postdeleteHome);


// Export this router so app.js can use it.
exports.hostRouter = hostRouter;




// ================= Routing Best Practices =================
//
// Router Responsibilities:
// - Define application endpoints (URLs).
// - Match HTTP methods (GET, POST, PUT, DELETE).
// - Forward requests to controllers.
// - Keep routing logic simple.
//
// Router SHOULD NOT:
// - Contain business logic.(perform it in controllers)
// - Perform database operations.(perform it in models)
// - Handle complex calculations.
//
// Think:
// Request -> Router -> Controller -> Model -> Database
// =========================================================