import express, { RouterOptions } from "express";
import { register } from "../controllers/register";

const router = express.Router();

router.post("/register", register);

export default router;
