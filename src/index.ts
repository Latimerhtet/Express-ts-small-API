import express, { Express, Request, Response } from "express";
import { json } from "stream/consumers";

const app: Express = express();
const port = 6000;
app.use(express.json());

type menu = {
  id: number;
  name: string;
  price: number;
};

let id = 1;
let memory: menu[] = [];

app.post("/", (req: Request, res: Response) => {
  const { name, price } = req.body;
  let menuId = id++;
  const newMenu = { id: menuId, name, price };
  memory.push(newMenu);
  res.status(200).json(newMenu);
});

app.get("/", (req: Request, res: Response) => {
  if (memory.length === 0) {
    res.status(200).json({ message: "The menu is empty!" });
  } else {
    res.status(200).json(memory);
  }
});

app.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const desiredMenu = memory.find((menu) => menu.id === Number(id));

  if (!desiredMenu) {
    res.status(404).json({ message: "Menu is not found" });
  }
  res.status(201).json(desiredMenu);
});

app.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const desiredMenu = memory.find((menu) => menu.id === Number(id));

  if (!desiredMenu) {
    res.status(404).json({ message: "Menu is not found" });
  } else {
    desiredMenu.name = name;
    desiredMenu.price = price;
    res.status(200).json(desiredMenu);
  }
});

app.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const desiredMenu = memory.find((menu) => menu.id === Number(id));
  if (!desiredMenu) {
    res.status(404).json({ message: "Menu is not found" });
  } else {
    memory = memory.filter((menu) => menu.id === Number(id));
    res.status(202).json({ message: "Deleted Successfully!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  console.log("Hello World");
});
