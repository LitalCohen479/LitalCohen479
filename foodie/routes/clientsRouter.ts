import express from "express";
import {
  setHello1,
} from "../control/productsCtrl";
const router = express.Router();

router

.get('/hello', setHello1)


export default router;