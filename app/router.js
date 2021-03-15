const express    = require("express");
const controller = require("./controller");

const routes     = express.Router();

routes.route("/search-by-multiple").get(controller.fetchMatchMultipleQuery);

module.exports = routes;