import * as dotenv from "dotenv"
import axios from 'axios'
import express, { Request, Response } from "express"
import { generateAuthURL, 
  
  authToAccessToken } from '../middleware/authz.middleware'
dotenv.config()

const blizzardAuthAxios = axios.create({
  baseURL: 'https://us.battle.net',
  headers: {
    'Accept': 'application/json', 
    'Accept-Language': 'en_US',
    'Access-Control-Allow-Origin': '*'
  }
})

const blizzardApiAxios = axios.create({
  baseURL: 'https://us.api.blizzard.com',
  headers: {
    'Accept': 'application/json', 
    'Accept-Language': 'en_US',
    'Access-Control-Allow-Origin': '*'
  }
})


const blizzardRouter = express.Router()
// Get the Battlenet and WoW profile together

// GET /oauth/userinfo (Blizzard Profile)
const getBnUserInfo = async () => {
  try {
    const res = await blizzardAuthAxios.get('/oauth/userinfo')
    return res.data
  } catch(err) {
    console.log(err.response.data.error)
  }
}

// GET /profile/user/wow (WoW Profile)
const getWoWProfile = async () => {
  try {
    const res = await blizzardApiAxios.get('/profile/user/wow?namespace=profile-us')
    return res.data
  } catch(err) {
    console.log(err.response.data.error)
  }
}

// GET /profile/user/wow/protected-character/{realm-id}-{character-id}
// GET /profile/user/wow/collections
// GET /profile/user/wow/collections/pets
// GET /profile/user/wow/collections/mounts


// GET blizzard/
blizzardRouter.get('/authorize', async function (req, res) {
  let url = await generateAuthURL()
  res.send(url)
})

// GET Battlenet User. Sets Authorization Headers
blizzardRouter.get('/auth/:id', async function (req, res) {
  let token = await authToAccessToken(req.params.id)
  blizzardAuthAxios.defaults.headers['Authorization'] = `Bearer ${token}`
  blizzardApiAxios.defaults.headers['Authorization'] = `Bearer ${token}`
  await getWoWProfile()
  res.send(await getBnUserInfo())
})

module.exports = blizzardRouter
