import * as dotenv from "dotenv"
import axios from 'axios'
import express, { Request, Response } from "express"
import { getClientCredToken, authToAccessToken } from '../middleware/authz.middleware'
dotenv.config()

const blizzardRouter = express.Router()

// GET blizzard/
blizzardRouter.get('/', function (req, res) {
  res.send('Hello Azeroth!')
  getClientCredToken()
})

// Auth to Access
blizzardRouter.get('/auth/:id', async function (req, res) {
  let token = await authToAccessToken(req.params.id)

  const fetch = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://us.battle.net/oauth/userinfo',
        headers: { 
          'Accept': 'application/json', 
          'Accept-Language': 'en_US',
          'Access-Control-Allow-Origin': '*', 
          'Authorization' : `Bearer ${token}`
        }
      })
      console.log(res.data)
      return res.data
    } catch(err) {
      console.log(err.response.data.error)
    }
  }

  res.send(await fetch())
})


module.exports = blizzardRouter
