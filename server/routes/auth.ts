import express, { Request, Response } from "express"
import { checkJwt } from "../middleware/authz.middleware"
export const authRouter = express.Router()



// GET auth/
authRouter.get('/', function (req, res) {
  res.send('Hello World!')
})
authRouter.use(checkJwt)

// authRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const items: Items = await ItemService.findAll();

//     res.status(200).send(items);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });


// GET auth/:id

// POST auth/

// PUT auth/

// DELETE auth/:id
