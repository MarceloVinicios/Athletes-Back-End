const axios = require("axios");

async function getTokenData(token) {
    const responseCreate = await axios.get("https://dev-v6oinruanic8adgg.us.auth0.com/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    return responseCreate.data;
}

module.exports = getTokenData