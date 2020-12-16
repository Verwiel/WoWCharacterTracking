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
