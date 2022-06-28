import express from "express";
import { getItem, addItem, deleteItem, updateItem } from "../control/productsCtrl";
const router = express.Router();

router
.get("/get-items", getItem)
.post("/add-item", addItem)
.delete("/delete-item", deleteItem)
.patch('/update-item', updateItem)

export default router;