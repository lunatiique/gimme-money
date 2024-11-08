const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("campaigns/list", "/campaigns/list")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new")
  .add("/info/aboutus", "/info/aboutus")
module.exports = routes;
