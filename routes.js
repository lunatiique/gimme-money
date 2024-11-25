const routes = require("next-routes")();

routes
  .add("/crowdfundings/new", "/crowdfundings/new")
  .add("crowdfundings/list", "/crowdfundings/list")
  .add("/crowdfundings/:address", "/crowdfundings/show")
  .add("/crowdfundings/:address/requests", "/crowdfundings/requests/index")
  .add("/crowdfundings/:address/requests/new", "/crowdfundings/requests/new")
  .add("/verify/index", "/verify/index")
  .add("/verify/new", "/verify/new")
  .add("/verify/list", "/verify/list")
  .add("/verify/validation", "/verify/validation")
  .add("/info/aboutus", "/info/aboutus")
module.exports = routes;
