import express, { Request, Response } from "express"
import { checkJwt } from "../middleware/authz.middleware"
export const authRouter = express.Router()



// GET auth/
authRouter.get('/', function (req, res) {
  res.send('Hello World!')
})
authRouter.use(checkJwt)

module.exports = authRouter
  // authRouter.get("/", async (req: Request, res: Response) => {
  //   try {
  //     const items: Items = await ItemService.findAll();

  //     res.status(200).send(items);
  //   } catch (e) {
  //     res.status(404).send(e.message);
  //   }
  // });


// GET auth/:id
  // itemsRouter.get("/:id", async (req: Request, res: Response) => {
  //   const id: number = parseInt(req.params.id, 10);

  //   try {
  //     const item: Item = await ItemService.find(id);

  //     res.status(200).send(item);
  //   } catch (e) {
  //     res.status(404).send(e.message);
  //   }
  // });

// POST
  // itemsRouter.post("/", async (req: Request, res: Response) => {
  //   try {
  //     const item: Item = req.body.item;

  //     await ItemService.create(item);

  //     res.sendStatus(201);
  //   } catch (e) {
  //     res.status(404).send(e.message);
  //   }
  // });

// PUT auth/

  // itemsRouter.put("/", async (req: Request, res: Response) => {
  //   try {
  //     const item: Item = req.body.item;

  //     await ItemService.update(item);

  //     res.sendStatus(200);
  //   } catch (e) {
  //     res.status(500).send(e.message);
  //   }
  // });

// DELETE auth/:id

  // itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id: number = parseInt(req.params.id, 10);
  //     await ItemService.remove(id);

  //     res.sendStatus(200);
  //   } catch (e) {
  //     res.status(500).send(e.message);
  //   }
  // });