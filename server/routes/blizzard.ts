import * as dotenv from "dotenv"
import express, { Request, Response } from "express"
import { getBlizzardToken } from '../middleware/authz.middleware'
dotenv.config()

const blizzardRouter = express.Router()

// GET blizzard/
blizzardRouter.get('/', function (req, res) {
  res.send('Hello Azeroth!')
  getBlizzardToken()
})

module.exports = blizzardRouter
