// Import Express framework.
const express = require("express");
const hostRouter = express.Router();

const hostController = require("../controllers/hostcontroller");

hostRouter.get("/add-home", hostController.addHome);

hostRouter.get("/hostHomeList", hostController.getHostHomeList);

hostRouter.get("/editHome/:id", hostController.getEditHome);


hostRouter.post("/add-home", hostController.postAddHome);

hostRouter.post("/edit-home", hostController.postEditHome);

hostRouter.post("/deletehome/:id", hostController.postdeleteHome);

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