import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { errorHandler } from "./middleware/error.middleware"
import { notFoundHandler } from "./middleware/notFound.middleware"

dotenv.config()


// App Variables - mount the middleware functions
const PORT: Number = parseInt(process.env.PORT as string, 10) || 5000
const app = express()

// const credentials = {
//   client: {
//     id: process.env.CLIENT_ID,
//     secret: process.env.CLIENT_SECRET
//   },
//   auth: {
//     tokenHost: "https://us.battle.net"
//   }
// };

// const oauth2 = require("simple-oauth2").create(credentials)
// let token: any = null;

// const getToken = () => {
//   if (token === null || token.expired()) {
//     return oauth2.clientCredentials
//       .getToken()
//       .then(oauth2.accessToken.create)
//       .then(res => {
//         console.log(res)
//         token = res;
//         return t.token.access_token;
//       });
//   } else {
//     return Promise.resolve(token.token.access_token);
//   }
// };

// App Configuration
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use("/auth", require("./routes/auth.ts"))
app.use("/blizzard", require("./routes/blizzard.ts"))
app.use(errorHandler)
app.use(notFoundHandler)


// Server Activation
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
