import express, { Request, Response } from "express"
export const authRouter = express.Router()

// GET auth/
authRouter.get('/', function (req, res) {
  res.send('Hello World!')
})


module.exports = authRouter
