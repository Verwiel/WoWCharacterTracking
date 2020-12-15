const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' })

// const authEndpoint = 'https://accounts.spotify.com/authorize';

// Region can be set as us, eu, or apac
let region = 'us'
export const authBaseURL = `https://${region}.battle.net/oauth`

const authEndpoint = `${authBaseURL}/authorize`
// const authEndpoint = `https://${region}.battle.net/oauth/token`

export const getAuthorizeHref = (): string => {
  const clientId = process.env.REACT_APP_BLIZZARD_CLIENT_ID
  const clientSecret = process.env.REACT_APP_BLIZZARD_SECRET
  const redirectUri = process.env.REACT_APP_BLIZZARD_REDIRECT_URI

  return `${authEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
}


// Check to make sure an access token was generated for the client: /oauth/check_token?token={token}
// Token URI: https://{region}.battle.net/oauth/token

// ${authEndpoint}?
// client_id=${clientId}&
// redirect_uri=${redirectUri}&
// scope=${scopes.join("%20")}&
// response_type=token

// Auth Code Flow: 
  // GET /oauth/userinfo*
  // GET /profile/user/wow
  // GET /profile/user/wow/protected-character/{realm-id}-{character-id}
  // GET /profile/user/wow/collections
  // GET /profile/user/wow/collections/pets
  // GET /profile/user/wow/collections/mounts