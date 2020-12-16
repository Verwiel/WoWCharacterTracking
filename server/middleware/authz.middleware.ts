import express from "express"
import axios from "axios"
import qs from "qs"
import * as dotenv from "dotenv"
import * as oauth2lib from "simple-oauth2"


dotenv.config()
const app = express()
// Set the configuration settings
const credentials: oauth2lib.ModuleOptions = {
  client: {
    id: process.env.BLIZZARD_CLIENT_ID as string,
    secret: process.env.BLIZZARD_CLIENT_SECRET as string
  },
  auth: {
    tokenHost: "https://us.battle.net"
  }
};

const oauth2AuthorizationCode = new oauth2lib.AuthorizationCode(credentials);
const oauth2ClientCredentials = new oauth2lib.ClientCredentials(credentials);

// #Authorization Code flow
export const generateAuthURL = async () => {
  return oauth2AuthorizationCode.authorizeURL({
      redirect_uri: process.env.BLIZZARD_REDIRECT_URI,
      scope: "wow.profile",
  });
}
export const createUserBnToken = async (authCode: string) => {
  // Get the access token object (the authorization code is given from the previous step).
  const tokenConfig = {
      code: authCode,
      redirect_uri: `${process.env.BLIZZARD_REDIRECT_URI}`,
      scope: "wow.profile",
  };

  // Save the access token
  try {
      const result = await oauth2AuthorizationCode.getToken(tokenConfig);
      const accessToken = oauth2AuthorizationCode.createToken(result.token);
  } catch (error) {
      console.log("Access Token Error", error.message);
  }
}

const clientCredentialsFlow = async () => {
  const tokenConfig = {};
  // Get the access token object for the client
  try {
      const result = await oauth2ClientCredentials.getToken(tokenConfig);
      const accessToken = oauth2ClientCredentials.createToken(result.token);
  } catch (error) {
      console.log("Access Token error", error.message);
  }
}




// Use auth code to generate a token for the user
export const authToAccessToken = async (authCode: string) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://us.battle.net/oauth/token',
      data: qs.stringify({
        'grant_type': 'authorization_code',
        'redirect_uri': `${process.env.BLIZZARD_REDIRECT_URI}`,
        'code': authCode,
        'scope': 'wow.profile'
      }),
      headers: { 
        'Accept': 'application/json', 
        'Accept-Language': 'en_US',
        'Access-Control-Allow-Origin': '*', 
        'Cache-Control': 'no-store',
        'Content-Type':'application/x-www-form-urlencoded',
        'Pragma': 'no-cache HTTP'
      },
      auth: {
        username: `${process.env.BLIZZARD_CLIENT_ID}`,
        password: `${process.env.BLIZZARD_CLIENT_SECRET}`
      }
    })
    return (res.data.access_token)
  } catch(err) {
    console.log(`Failed to create token: ${err.response.data.error}`)
  }
}
