import express from "express";
import {
  insertProducts,
} from "../control/productsCtrl";
const router = express.Router();

router

.get('/insert', insertProducts)


export default router;