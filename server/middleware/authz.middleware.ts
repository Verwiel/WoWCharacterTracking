import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import axios from "axios"
import qs from "qs"
import * as dotenv from "dotenv"

dotenv.config()

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ["RS256"]
})

// The Client Credentials grant is used when applications request an access token to access their own resources, not on behalf of a user.
export const getBlizzardToken = async () => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://us.battle.net/oauth/token',
      data: qs.stringify({
        'grant_type': 'client_credentials' 
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
    console.log(res.data)
  } catch(err) {
    console.log(err)
  }
}
