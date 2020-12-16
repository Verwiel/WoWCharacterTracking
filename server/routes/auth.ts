import express, { Request, Response } from "express"
import { checkJwt } from "../middleware/authz.middleware"
export const authRouter = express.Router()


// GET auth/
authRouter.get('/', function (req, res) {
  res.send('Hello World!')
})
authRouter.use(checkJwt)

module.exports = authRouter
