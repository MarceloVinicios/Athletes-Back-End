const { auth } = require("express-oauth2-jwt-bearer");

module.exports = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-v6oinruanic8adgg.us.auth0.com/",
  algorithms: ["RS256"],
});